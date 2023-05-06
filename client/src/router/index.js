import Vue from "vue";
import VueRouter from "vue-router";
import admin from "./admin";
import home from "./home";
// import HomeProduct from "../components/product/HomeProduct.vue";
// import AddProduct from "../components/product/AddProduct.vue";
// import EditProduct from "../components/product/EditProduct.vue";

// import HomeUser from "../components/users/HomeUser.vue";
// import AddUser from "../components/users/AddUser.vue";
// import EditUser from "../components/users/EditUser.vue";


// import HomeCategory from "../components/category/HomeCategory.vue";
// import AddCategory from "../components/category/AddCategory.vue";
// import EditCategory from "../components/category/EditCategory.vue";

Vue.use(VueRouter);


const routes = [...admin,...home];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,

});

export default router;
