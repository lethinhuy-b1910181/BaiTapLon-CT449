
<template lang="">
  <v-app>
    <div class="background"></div>
    <v-main class="d-flex justify-center align-center">
      <v-alert
      border="left"
      close-text
      dismissible
      dark
      color="red lighten-1"
      v-if="show"
    >
      Email hoặc Mật khẩu chưa đúng!
    </v-alert>
      <v-col cols="10" lg="4" class="mx-auto">
        <v-card class="pa-4">
          <div class="text-center">
            <v-avatar size="100" color="indigo lighten-4">
              <v-icon size="40" color="indigo">mdi-account</v-icon>
            </v-avatar>
            <h2 style="color: #3F51B5;">ĐĂNG NHẬP</h2>
          </div>
          <v-form 
            ref="form"
            @submit.prevent="login"
            enctype="multipart/form-data"
          
          >
            <v-card-text>
              <v-text-field
              v-model="users.email"
                            filled="filled"
                            label="Email"
                            :rules="[rules.required]"
              />
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
                            @click:append="show1 = !show1"
                      
                     
              />
            </v-card-text>
            <v-card-actions class="justify-center" >
              <v-btn :loading="loading" type="submit" color="primary" style="background-color: #3F51B5;" >
                <span class="white--text px-8">ĐĂNG NHẬP</span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-main>
  </v-app>
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
                    email: "",
                    password: ""
                },
                show: false,
                show1: false
            };
        },

        methods: {
            async login() {

                if (this.$refs.form.validate()) {
                    let result = await API.getLogin(this.users.email, this.users.password);
                    console.log(result.status);
                    console.warn(result.data.length);
                    if (result.status == 200 && result.data.length > 0) {
                        console.log(result.data);
                        localStorage.setItem("user-info", JSON.stringify(result));
                        this
                            .$router
                            .push({name: "show-user"});
                    } else {
                        this.show = true;
                    }
                }
            }
        }
    };
</script>
<style >.background {
  background-color: #004d40;
  height: 50%;
  width: 100%;
  top: 0;
  display: block;
  position: absolute;

  
 }</style>