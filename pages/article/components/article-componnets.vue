<template>
  <div>
    <form class="card comment-form" @submit.prevent="onSubmit">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="userComment"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="article.author.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="(comment, index) in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
          >{{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{
          comment.createdAt | date("MMMM D, YYYY")
        }}</span>
        <span
          class="mod-options"
          v-show="user && comment.author.username === user.username"
        >
          <i class="ion-trash-a" @click="delComments(comment.id, index)"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { getComments, sendComments, deleteComments } from "@/api/article.js";
import { mapState } from "vuex";
export default {
  name: "ArticleComments",
  props: ["article"],
  data() {
    return {
      comments: [], // 评论列表
      userComment: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.getCommentsList();
  },
  methods: {
    async getCommentsList() {
      const {
        data: { comments },
      } = await getComments(this.article.slug);
      this.comments = comments;
    },
    async onSubmit() {
      if (this.userComment === "") {
        alert("请输入评论内容");
        return;
      }
      const {
        data: { comment },
      } = await sendComments(this.article.slug, {
        comment: { body: this.userComment },
      });
      this.userComment = "";
      this.comments.unshift(comment);
    },
    async delComments(id, index) {
        await deleteComments(this.article.slug, id);
        this.comments.splice(index, 1);
    },
  },
};
</script>
<style scoped></style>
