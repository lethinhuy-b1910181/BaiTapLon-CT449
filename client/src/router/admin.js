import VueRouter from "vue-router";
import HomeProduct from "../components/product/HomeProduct.vue";
import AddProduct from "../components/product/AddProduct.vue";
import EditProduct from "../components/product/EditProduct.vue";

import HomeUser from "../components/users/HomeUser.vue";
import AddUser from "../components/users/AddUser.vue";
import EditUser from "../components/users/EditUser.vue";

import HomeCategory from "../components/category/HomeCategory.vue";
import AddCategory from "../components/category/AddCategory.vue";
import EditCategory from "../components/category/EditCategory.vue";
const admin = [
    {

        path: "/admin",
        component: () => import ("../views/admin.vue"),
        name: "admin",
        children: [
            {
                path: "/show-product",
                name: "show-product",
                component: HomeProduct
            },
            /// product
            {
                path: "/add-pro",
                name: "add-pro",
                component: AddProduct
            }, {
                path: "/edit-pro/:id",
                name: "edit-pro",
                component: EditProduct
            },

            // user
            {
                path: "/show-user",
                name: "show-user",
                component: HomeUser
            }, {
                path: "/add-user",
                name: "add-user",
                component: AddUser
            }, {
                path: "/edit-user/:id",
                name: "edit-user",
                component: EditUser
            },

            // category
            {
                path: "/category",
                name: "category",
                component: HomeCategory
            }, {
                path: "/add-category",
                name: "add-category",
                component: AddCategory
            }, {
                path: "/edit-category/:id",
                name: "edit-category",
                component: EditCategory
            }
        ]
    }
];

export default admin;