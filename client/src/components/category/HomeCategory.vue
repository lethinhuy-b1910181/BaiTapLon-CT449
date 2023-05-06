<template>
    <v-container>
        <br/>
        <v-row>
            <v-col cols="auto" class="pt-5 pb-3">
                <v-btn class="green accent-4 white--text" :to="{ name: 'add-category' }">
                    <i class="fas fa-plus"></i>
                </v-btn >
            </v-col>
        </v-row>

        <br/>

        <v-alert
            border="left"
            close-text="close-text"
            dismissible="dismissible"
            dark="dark"
            color="green accent-4"
            v-if="show">
            Xóa thành công!
        </v-alert>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Tìm kiếm (tên)"
            single-line="single-line"
            hide-details="hide-details"></v-text-field>
        <br/>
        <table
            id="contacts"
            class="table table-bordered table-striped"
            style="width: 100%">
            <thead>
                <tr>
                    <th>Tên thương hiệu</th>
                    <th>Công cụ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cate in filteredCategory" :key="cate._id">
                    <td>{{ cate.name }}</td>

                    <td>
                        <router-link :to="{ name: 'edit-category', params: { id: cate._id } }">
                            <i class="fa-solid fa-pen-to-square color" color="blue"></i >
                        </router-link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button text="text" @click="remove(cate._id)">
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
    import API from "@/services/api.category";

    export default {
        name: "Home",
        data() {
            return {search: "", show: false, category: []};
        },

        methods: {
            async remove(id) {
                console.log(id);
                const res = API.deleteCategory(id);
                this.created();
                this.show = true;
            },
            async created() {
                this.category = await API.getAllCategory();
                console.log(this.category);
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
            filteredCategory() {
                return this
                    .category
                    .filter((cate) => {
                        const trimmedSearch = cate
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