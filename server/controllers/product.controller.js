const Post = require("../models/product.model");
const fs = require("fs");
module.exports = class API {
    //fetch all post
    static async fetchAllPro(req, res) {
        try {
            const posts = await Post.find();
            res
                .status(200)
                .json(posts);
        } catch (err) {
            res
                .status(404)
                .json({message: err.message});
        }
    }
    // fetch post by id
    static async fetchProByID(req, res) {
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            res
                .status(200)
                .json(post);
        } catch (err) {
            res
                .status(404)
                .json({message: err.message});
        }
    }
    // create post
    static async createPro(req, res) {
        const post = req.body;
        const imgname = req.file.filename;
        post.image = imgname;
        try {
            const result = await Post.create(post);
            return res.send(result);
        } catch (err) {
            res
                .status(400)
                .json({message: err.message});
        }
    }
    // update a post
    static async updatePro(req, res) {
        const id = req.params.id;
        let new_image = "";
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync("./uploads/" + req.body.old_image);
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }
        const newPost = req.body;
        newPost.image = new_image;
        try {
            await Post.findByIdAndUpdate(id, newPost);
            res
                .status(200)
                .json({message: "update successfull!"});
        } catch (err) {
            res
                .status(404)
                .json({message: err.message});
        }
    }
    // delete a post
    static async deletePro(req, res) {
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id);
            if (result.image != "") {
                try {
                    fs.unlinkSync("./uploads" + result.image);
                } catch (err) {
                    console.log(err);
                }
            }
            res
                .status(200)
                .json({message: "delete successfull!"});
        } catch (err) {
            res
                .status(404)
                .json({message: err.message});
        }
    }
};
