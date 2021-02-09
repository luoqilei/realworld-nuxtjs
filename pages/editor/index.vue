<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="field + index">{{ field }} : {{ message }}</li>
            </template>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="newArticle.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="newArticle.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="newArticle.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tag"
                  @keyup.enter="addTag"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill ng-binding ng-scope"
                    v-for="(item, index) in newArticle.tagList"
                    :key="item"
                  >
                    <i class="ion-close-round" @click="removeTag(index)"></i>
                    {{ item }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createArticle, getArticle, updateArticle } from "@/api/editor.js";
export default {
  // 在路由匹配组件之前会先执行中间件
  middleware: "user",
  name: "EditorIndex",
  data() {
    return {
      tag: "",
      errors: {},
    };
  },
  async asyncData({ params }) {
    const slug = params.slug;
    let newArticle = {
      title: "",
      description: "",
      body: "",
      tagList: [],
    };
    if (slug) {
      const {
        data: { article },
      } = await getArticle(params.slug);
      newArticle = {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      };
    }
    return { slug, newArticle };
  },
  methods: {
    async onSubmit() {
      try {
        const {
          data: { article },
        } = this.slug
          ? await updateArticle(this.slug, { article: this.newArticle })
          : await createArticle({ article: this.newArticle });
        this.$router.push({
          name: "article",
          params: {
            slug: article.slug,
          },
        });
      } catch (error) {
        this.errors = error.response.data.errors
      }
    },
    addTag() {
      const newTag = this.tag.trim();
      if (newTag !== "" && !this.newArticle.tagList.includes(newTag)) {
        this.newArticle.tagList.push(this.tag.trim());
        this.tag = "";
      }
    },
    removeTag(index) {
      this.newArticle.tagList.splice(index, 1);
    },
  },
};
</script>
<style scoped></style>
