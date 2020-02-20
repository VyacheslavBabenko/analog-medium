<template>
  <div class="container">
    <div class="edit-post">
      <h1>Создать новый пост</h1>
      <b-field label="Название поста">
        <b-input v-model="title" maxlength="200" type="textarea"></b-input>
      </b-field>
      <b-field label="Описание">
        <b-input
          v-model="description"
          maxlength="200"
          type="textarea"
        ></b-input>
      </b-field>
      <b-button @click="createNewPost()">Создать</b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Edit",
  data() {
    return {
      title: "",
      description: "",
      urlPosts: "http://localhost:3000/posts"
    };
  },
  methods: {
    async createNewPost() {
      let postId = `f${(+new Date()).toString(16)}`;

      await axios
        .post(this.urlPosts, {
          id: postId,
          title: this.title,
          description: this.description,
          claps: 0,
          createdAt: moment(),
          updateAt: moment(),
          userId: this.$store.getters.USERID
        })
        .then(() => {
          this.$router.push("/main");
        });
    },
    isAuth() {
      if (!this.$store.getters.ISAUTH) {
        this.$router.replace("/");
      }
    }
  },
  created() {
    this.isAuth();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
