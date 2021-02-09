<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              v-if="user && user.username === username"
              @click="editSetting"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </button>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="onFollowing"
              v-else
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{
                profile.following
                  ? `Unfollow ${profile.username}`
                  : `Follow ${profile.username}`
              }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'my_articles' }"
                  :to="{
                    name: 'profile',
                    query: { tab: 'my_articles' },
                  }"
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'favorited_articles' }"
                  :to="{
                    name: 'profile',
                    query: { tab: 'favorited_articles' },
                  }"
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articleList"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: { username: article.author.username },
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="`/profile/${article.author.username}`"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{
                  article.createdAt | date("MMMM D, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link class="preview-link" :to="`/article/${article.slug}`">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li
                  class="tag-default tag-pill tag-outline"
                  v-for="tag in article.tagList"
                  :key="tag"
                >
                  {{ tag }}
                </li>
              </ul>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProfile, getMyArticles } from "@/api/profile.js";
import {
  addFavorite,
  delFavorite,
  following,
  unFollowing,
} from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "UserProfile",
  watchQuery: ["tab"],
  async asyncData({ params, query }) {
    const username = params.username;
    const { tab = "my_articles" } = query;
    const postVal =
      tab === "my_articles" ? { author: username } : { favorited: username };
    const [profileRes, articleRes] = await Promise.all([
      getProfile(username),
      getMyArticles(postVal),
    ]);
    const profile = profileRes.data.profile;
    const articleList = articleRes.data.articles;
    const articlesCount = articleRes.data.articlesCount;
    articleList.forEach((article) => (article.favoriteDisabled = false));
    return { profile, articleList, articlesCount, username, tab };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async onFavorite(article) {
      if (!this.user) {
        this.$router.push("/register");
        return;
      }
      article.favoriteDisabled = true;
      if (article.favorited) {
        // 取消点赞
        await delFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        // 点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    },
    editSetting() {
      this.$router.push({
        name: "settings",
        params: {
          username: this.user.username,
        },
      });
    },
    async onFollowing() {
      if (!this.user) {
        this.$router.push("/register");
        return;
      }
      const {
        data: { profile },
      } = this.profile.following
        ? await unFollowing(this.profile.username)
        : await following(this.profile.username);
      this.profile = profile;
    },
  },
};
</script>
<style scoped></style>
