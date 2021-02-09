<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta
          :article="article"
          @favoriteClick="favoriteClick"
          @followingClick="followingClick"
        />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
        <ul class="tag-list">
          <li
            v-for="tag in article.tagList"
            :key="tag"
            class="tag-default tag-pill tag-outline ng-binding ng-scope"
          >
            {{ tag }}
          </li>
        </ul>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta
          :article="article"
          @favoriteClick="favoriteClick"
          @followingClick="followingClick"
        />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2" v-if="user">
          <article-componnets :article="article" />
        </div>
        <div class="col-xs-12 col-md-8 offset-md-2" v-else>
          <p show-authed="false" style="display: inherit;">
            <nuxt-link to="/login">Sign in</nuxt-link> or
            <nuxt-link to="/register">sign up</nuxt-link> to add
            comments on this article.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticle } from "@/api/article";
import MarkdownIt from "markdown-it";
import articleMeta from "./components/article-meta.vue";
import ArticleComponnets from "./components/article-componnets.vue";
import { mapState } from "vuex";
export default {
  components: { articleMeta },
  name: "ArticleIndex",
  components: { articleMeta, ArticleComponnets },
  computed: {
    ...mapState(["user"]),
  },
  async asyncData({ params }) {
    const {
      data: { article },
    } = await getArticle(params.slug);
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return {
      article,
    };
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
  methods: {
    favoriteClick(article) {
      this.article = article;
    },
    followingClick(author) {
      this.article.author = author;
    },
  },
};
</script>
<style scoped></style>
