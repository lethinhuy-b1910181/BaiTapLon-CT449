<template>
    <v-container>
        <br/>
        <v-row>
            <v-col class="pt-5">
                <v-btn class="green accent-4 white--text" :to="{ name: 'add-pro' }">
                    <i class="fas fa-plus"></i>
                </v-btn >
            </v-col>
            <div>
                <h5 class="pt-5">
                    Sắp xếp đơn giá:&nbsp;&nbsp;
                    <v-btn @click="sortByAsc" class="green accent-4 white--text">
                        <i class="fa-solid fa-up-long"></i>
                    </v-btn>
                    &nbsp;&nbsp;
                    <v-btn @click="sortByDesc" class="green accent-4 white--text">
                        <i class="fa-solid fa-down-long"></i >
                    </v-btn>

                </h5>

            </div>
        </v-row>

        <br/>
        <!-- alert update -->
        <v-alert
            border="left"
            close-text="close-text"
            dismissible="dismissible"
            dark="dark"
            color="green accent-4"
            v-if="this.$route.params.message">
            {{ this.$route.params.message }}
        </v-alert>
        <!-- alert delete -->
        <v-alert
            border="left"
            close-text="close-text"
            dismissible="dismissible"
            dark="dark"
            color="green accent-4"
            v-if="show">
            Xóa thành công!
        </v-alert>
        <!-- search -->
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Tìm kiếm (tên)"
            single-line="single-line"
            hide-details="hide-details"></v-text-field>
        <br/>
        <!-- show data -->
        <table
            id="contacts"
            class="table table-bordered table-striped"
            style="width: 100%">
            <thead>
                <tr>
                    <th class="">Tên</th>
                    <th class="">Ảnh</th>
                    <th class="">Số Lượng</th>
                    <th class="">Giá</th>
                    <th class="">Thương hiệu</th>
                    <th class="">Tính năng</th>
                    <th class="">Công cụ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in filteredProduct" :key="product._id">
                    <td >{{ product.name }}</td>
                    <td>
                        <v-img height="50px" width="50px" :src="`/${product.image}`"></v-img>
                    </td>
                    <td>{{ product.qty }}</td>
                    <td>{{ product.price }}đ</td>
                    <span v-for="cate in category">
                        <td v-if="product.category == cate._id" class="border-0">
                            {{ cate.name }}
                        </td>
                    </span>
                    <td>{{ product.detail }}</td>
                    <td>
                        <router-link :to="{ name: 'edit-pro', params: { id: product._id } }">
                            <i class="fa-solid fa-pen-to-square color" color="blue"></i >
                        </router-link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button text="text" @click="removePro(product._id)">
                            <i class="fa-solid fa-trash-can color" color="red"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <br/>
    </v-container>
</template>

<script>
    import axios from "axios";
    import API from "../../services/api.product";
    import APICategory from "@/services/api.category";

    export default {
        name: "Home",
        data() {
            return {
                search: "",
                show: false,
                products: [],
                category: [],
                sortBy: "",
                keys: ["Tên", "Số Lượng", "Giá"]
            };
        },

        methods: {

            sortByAsc() {
                this
                    .products
                    .sort((a, b) => (
                        a.price < b.price
                            ? -1
                            : 1
                    ));
            },
            sortByDesc() {
                this
                    .products
                    .sort((a, b) => (
                        a.price > b.price
                            ? -1
                            : 1
                    ));
            },
            async removePro(id) {
                console.log(id);
                const res = API.deleteProduct(id);
                this.created();
                this.show = true;
            },
            async created() {
                this.products = await API.getAllProduct();
                this.category = await APICategory.getAllCategory();
                // console.log(this.products);
            }
        },

        async mounted() {
            this.created();
            let user = localStorage.getItem("user-info");
            if (!user) {
                this
                    .$router
                    .push({name: "login"});
            }
        },

        computed: {

            filteredProduct() {
                return this
                    .products
                    .filter((temp) => {
                        const trimmedSearch = temp
                            .name
                            .toLowerCase()
                            .trim()
                        return trimmedSearch.includes(this.search.toLowerCase().trim())
                    });
            }
        }
    };
</script>

<style>
    .i {
        width: 100px;
        height: 100px;
    }
</style>