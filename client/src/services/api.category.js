import axios from "axios";
const url = "/api/category";

export default class API {
  static async getAllCategory() {
    const res = await axios.get(url);
    return res.data;
  }
  static async getCategoryByID(id) {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  }
  static async addCategory(post) {
    const res = await axios.post(url, post);
    return res.data;
  }
  static async updateCategory(id, post) {
    const res = await axios.put(`${url}/${id}`, post);
    return res.data;
  }
  static async deleteCategory(id) {
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
  }
}
