<template lang="">
    <v-container>
        <v-alert
            border="left"
            close-text="close-text"
            dismissible="dismissible"
            dark="dark"
            color="green accent-4"
            v-if="show">Thêm thành công!
        </v-alert>
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card>
                    <v-card-title
                        class="justify-content-center pt-5 bg-success white--text"
                        color="text--darken-2">
                        <h3>Thêm Thành Viên</h3>
                    </v-card-title >
                    <v-form ref="form" @submit.prevent="submitForm" class="pa-5">
                        <v-text-field
                            v-model="users.name"
                            filled="filled"
                            label="Tên người dùng"
                            :rules="[rules.required]"></v-text-field>
                        <v-radio-group
                            row="row"
                            v-model="users.gender"
                            filled="filled"
                            label="Giới tính"
                            mandatory="mandatory">
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
                        <v-btn type="submit" class="green accent-4 white--text float-right">Thêm</v-btn >
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
        name: "add-user",
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
        methods: {
            async submitForm() {
                const formUser = new FormData();
                formUser.append("name", this.users.name);
                formUser.append("gender", this.users.gender);
                formUser.append("email", this.users.email);
                formUser.append("password", this.users.password);
                if (this.$refs.form.validate()) {
                    let result = await API.addUser(formUser);
                    console.warn(result);

                    if (result) {
                        this.show = true;
                        this
                            .$refs
                            .form
                            .reset();

                    }
                }

            }
        },

        async mounted() {
            let user = localStorage.getItem("user-info");
            if (!user) {
                this
                    .$router
                    .push({name: "login"});
            }
        }
    };
</script>
<style lang=""></style>