<template>
  <div class="container">
    <div class="edit-post">
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
      <b-button @click="sendCorrectedPost()">Изменить</b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Edit",
  data() {
    return {
      title: this.$store.getters.POSTTOEDIT.title,
      description: this.$store.getters.POSTTOEDIT.description,
      urlPosts: "http://localhost:3000/posts"
    };
  },
  methods: {
    async sendCorrectedPost() {
      let post = this.$store.getters.POSTTOEDIT;

      await axios
        .put(this.urlPosts + `/${post.id}`, {
          id: post.id,
          title: this.title,
          description: this.description,
          claps: post.claps,
          createdAt: post.createdAt,
          updateAt: new Date(),
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
