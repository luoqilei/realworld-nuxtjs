<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
      ><img :src="article.author.image"
    /></nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
        class="author"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.createdAt | date("MMMM D, YYYY") }}</span>
    </div>
    <template
      v-if="!user || (user && user.username !== article.author.username)"
    >
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
        @click="onFollowing"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{
          article.author.following
            ? `Unfollow ${article.author.username}`
            : `Follow ${article.author.username}`
        }}
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
        @click="onFavorite"
      >
        <i class="ion-heart"></i>
        &nbsp; {{ article.favorited ? "Unfavorite Post" : "Favorite Post" }}
        <span class="counter">{{ `(${article.favoritesCount})` }}</span>
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        @click="onEditor"
      >
        <i class="ion-edit"></i>
        &nbsp; Edit Article
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-outline-danger btn-sm"
        @click="deleteArticle"
      >
        <i class="ion-trash-a"></i>
        &nbsp; Delete Article
      </button>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  addFavorite,
  delFavorite,
  following,
  unFollowing,
  delArticle,
} from "@/api/article";
export default {
  name: "ArticleMeta",
  props: ["article"],
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async onFavorite() {
      if (!this.user) {
        this.$router.push("/register");
        return;
      }
      const {
        data: { article },
      } = this.article.favorited
        ? await delFavorite(this.article.slug)
        : await addFavorite(this.article.slug);
      this.$emit("favoriteClick", article);
    },
    async onFollowing() {
      if (!this.user) {
        this.$router.push("/register");
        return;
      }
      const {
        data: { profile },
      } = this.article.author.following
        ? await unFollowing(this.article.author.username)
        : await following(this.article.author.username);
      this.$emit("followingClick", profile);
    },
    async deleteArticle() {
      await delArticle(this.article.slug);
      this.$router.push("/");
    },
    onEditor() {
      this.$router.push({
        name: "editor",
        params: {
          slug: this.article.slug,
        },
      });
    },
  },
};
</script>
<style scoped></style>
