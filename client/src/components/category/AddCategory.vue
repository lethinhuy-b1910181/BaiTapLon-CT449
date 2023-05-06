<template lang="">
    <v-container>
        <v-alert
            border="left"
            close-text="close-text"
            dismissible="dismissible"
            dark="dark"
            color="green accent-4"
            v-if="show">
            Thêm thành công!
        </v-alert>
        <br/>
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card>
                    <v-card-title class="subheading font-weight-bold">Thêm Thương Hiệu</v-card-title >
                    <v-form
                        ref="form"
                        @submit.prevent="submitForm"
                        class="pa-5"
                        enctype="multipart/form-data">
                        <v-text-field v-model="category.name" label="Tên thương hiệu" :rules="rules"></v-text-field>

                        <v-btn type="submit" color="success">Thêm</v-btn>
                        <router-link :to="{name: 'category'}">
                            <v-btn class="red mx-3 white--text float-right">HỦY</v-btn >
                        </router-link >
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import axios from "axios";
    import API from "@/services/api.category";
    export default {
        name: "add-pro",
        data() {
            return {
                rules: [(value) => !!value || "this field is required"],
                category: {
                    name: ""
                },
                show: false
            };
        },
        methods: {
            async submitForm() {
                const formData = new FormData();
                formData.append("name", this.category.name);

                if (this.$refs.form.validate()) {
                    const res = await API.addCategory(formData);
                    if (res) {
                        this.show = true;
                        this
                            .$refs
                            .form
                            .reset();
                    }
                }
            }
        }
    };
</script>
<style lang=""></style>