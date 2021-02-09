<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link to="/login" v-if="!isLogin">Have an account?</nuxt-link>
            <nuxt-link to="/register" v-else>Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">{{ field }} : {{ message }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
import { mapMutations } from 'vuex'
// 只在客户端加载 js-cookie
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: 'notUser',
  name: "LoginIndex",
  data() {
    return {
      user: {
        username: '',
        email: "",
        password: "",
      },
      errors: {},  // 错误信息
    };
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  methods: {
    ...mapMutations(['setUser']),
    // 登录
    async onSubmit() {
      try {
        const { data: { user } } = this.isLogin ? await login({
          user: this.user,
        }) : await register({
          user: this.user,
        })
        this.setUser(user)
        // 持久化token
        Cookie.set('user', user)
        // 跳转至首页
        this.$router.push("/");
      } catch (error) {
        this.errors = error.response.data.errors
      }
    },
  },
};
</script>

<style scoped></style>
