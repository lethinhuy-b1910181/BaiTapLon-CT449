const Post = require("../models/category.model");
const fs = require("fs");
module.exports = class API {
    //fetch all post
    static async fetchAllCategory(req, res) {
        try {
            const post = await Post.find();
            res
                .status(200)
                .json(post);
        } catch (err) {
            res
                .status(404)
                .json({message: err.message});
        }
    }
    // fetch post by id
    static async fetchCategoryByID(req, res) {
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
    async findByName(name) {
        return await this.find({
            name: {
                $regex: new RegExp(name),
                $options: "i"
            }
        });
    }
    // create post
    static async createCategory(req, res) {
        const post = req.body;

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
    static async updateCategory(req, res) {
        const id = req.params.id;

        const newPost = req.body;

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
    static async deleteCategory(req, res) {
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
