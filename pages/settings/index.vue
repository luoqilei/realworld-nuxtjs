<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="user.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                ></textarea>
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
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCurrentUser, updateUser } from "@/api/setting.js";
import { mapMutations } from "vuex";
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: "user",
  name: "SettingsIndex",
  async asyncData() {
    const {
      data: { user },
    } = await getCurrentUser();
    return {
      user: {
        image: user.image,
        username: user.username,
        bio: user.bio,
        email: user.email,
        password: "",
      },
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    async onSubmit() {
      const {
        data: { user },
      } = await updateUser(this.user);
      this.setUser(user);
    },
    logout() {
      Cookie.remove('user')
      this.setUser(null);
      this.$router.push('/')
    }
  },
};
</script>
<style scoped></style>
