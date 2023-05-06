import axios from "axios";
const url = "/api/product";

export default class API {
  static async getAllProduct() {
    const res = await axios.get(url);
    return res.data;
  }
  static async getProductByID(id) {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  }
  static async addProduct(post) {
    for (const value of post.values()) {
      console.log(value);
    }
    const res = await axios.post(url, post);
    return res.data;
  }
  static async updateProduct(id, post) {
    const res = await axios.patch(`${url}/${id}`, post);
    return res.data;
  }
  static async deleteProduct(id) {
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
  }
}
