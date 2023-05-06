<template lang="">
    <v-container>
        <v-alert
            border="left"
            close-text="close-text"
            dismissible="dismissible"
            dark="dark"
            color="green accent-4"
            v-if="show">
            Cập nhật thành công!
        </v-alert>
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card>
                    <v-card-title
                        class="justify-content-center pt-5 bg-success white--text"
                        color="text--darken-2">
                        <h3>Cập Nhật Thông Tin</h3>
                    </v-card-title>

                    <v-form
                        ref="form"
                        @submit.prevent="updateForm"
                        class="pa-5"
                        enctype="multipart/form-data">
                        <v-text-field
                            v-model="users.name"
                            filled="filled"
                            label="Tên người dùng"
                            :rules="[rules.required]"></v-text-field>
                        <v-radio-group row="row" v-model="users.gender" label="Giới tính">
                            <v-radio label="Nam" value="M"></v-radio>
                            <v-radio label="Nữ" value="F"></v-radio>
                        </v-radio-group>
                        <v-text-field
                            v-model="users.email"
                            filled="filled"
                            label="Email"
                            :rules="[rules.required]"></v-text-field>
                        <v-text-field
                            v-model="users.password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="Mật khẩu"
                            hint="At least 8 characters"
                            filled="filled"
                            counter="counter"
                            @click:append="show1 = !show1"></v-text-field>
                        <v-btn type="submit" class="green accent-4 white--text float-right">Cập nhật</v-btn >
                        <router-link :to="{name: 'show-user'}">
                            <v-btn class="red mx-3 white--text float-left">HỦY</v-btn >
                        </router-link >
                        <div class="mb-10"></div>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import axios from "axios";
    import API from "@/services/api.user";
    export default {
        name: "add-pro",
        data() {
            return {
                rules: {
                    required: (value) => !!value || "This field is Required.",
                    min: (v) => v.length >= 8 || "Min 8 characters",
                    emailMatch: () => `The email and password you entered don't match`
                },
                users: {
                    name: "",
                    gender: "",
                    email: "",
                    password: ""
                },
                show1: false,
                show: false
            };
        },
        async created() {
            const res = await API.getUserByID(this.$route.params.id);
            this.users = res;
        },
        async mounted() {
            let user = localStorage.getItem("user-info");
            if (!user) {
                this
                    .$router
                    .push({name: "login"});
            }
        },
        methods: {
            async updateForm() {
                const formData = new FormData();
                formData.append("name", this.users.name);
                formData.append("gender", this.users.gender);
                formData.append("email", this.users.email);
                formData.append("password", this.users.password);
                console.log(this.users.password);

                if (this.$refs.form.validate()) {
                    const res = await API.updateUser(this.$route.params.id, formData);
                    if (res) {
                        this
                            .$router
                            .push({
                                name: "show-user",
                                params: {
                                    message: "Cập nhật thành công!"
                                }
                            });

                    }
                }

            }
        }
    };
</script>
<style lang=""></style>