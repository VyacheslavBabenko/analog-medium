<template>
  <div class="container main-tiles">
    <b-button
      v-if="$store.getters.USERROLE == 'writer'"
      @click="goToCreatePost()"
      type="is-success"
      class="new-post-btn"
    >
      Создать новый пост
    </b-button>
    <div
      v-for="(post, index) in $store.getters.POSTS"
      :key="post.id"
      class="tile is-6"
    >
      <template v-if="index < minPosts">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child notification is-success">
              <p class="title">{{ post.title }}</p>
              <p class="subtitle">
                {{ post.description }}
              </p>
              <div class="bottom-functionality">
                <div class="part-time">
                  <div class="time">{{ post.updateAt | rangeDate }}</div>
                </div>
                <div class="part-btns">
                  <b-button
                    v-if="$store.getters.USERROLE == 'writer'"
                    type="is-danger"
                    icon-left="delete"
                    @click="deletePost(post.id)"
                  >
                    Удалить
                  </b-button>
                  <b-button
                    v-if="$store.getters.USERROLE == 'writer'"
                    @click="editPost(post)"
                    type="is-white"
                    icon-left="pencil"
                  >
                    Изменить
                  </b-button>
                  <b-button
                    @click="addClaps(post)"
                    v-if="$store.getters.USERROLE == 'reader'"
                    type="is-white"
                    icon-left="thumb-up"
                  >
                    {{ post.claps }}
                  </b-button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </template>
    </div>
    <b-button
      v-if="$store.getters.POSTSLENGTH > minPosts"
      @click="loadMore()"
      type="is-success"
    >
      Загрузить еще
    </b-button>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Main",
  data() {
    return {
      urlPosts: "http://localhost:3000/posts",
      urlUsers: "http://localhost:3000/users",
      posts: [],
      minPosts: 10
    };
  },
  filters: {
    rangeDate(date) {
      let today = moment();
      date = moment(date);
      let difference = today.diff(date, "days");
      if (difference > 0) {
        return `${difference} дн. назад`;
      } else {
        return "Cегодня";
      }
    }
  },
  methods: {
    loadMore() {
      this.minPosts += 10;
    },
    createNewPost() {
      axios.post(this.urlPosts, {
        id: 63,
        first_name: "Fred",
        last_name: "Blair",
        email: "freddyb34@gmail.com"
      });
    },
    goToCreatePost() {
      this.$router.push("/new-post");
    },
    deletePost(idPost) {
      axios.delete(this.urlPosts + `/${idPost}`).then(() => {
        this.$store.commit("getPosts");
      });
    },
    addClaps(post) {
      post.claps++;
      axios.put(this.urlPosts + `/${post.id}`, {
        id: post.id,
        title: post.title,
        description: post.description,
        claps: post.claps,
        createdAt: post.createdAt,
        updateAt: post.updateAt,
        userId: post.userId
      });
    },
    editPost(post) {
      this.$store.commit("editPost", post);
      this.$router.push("/edit");
    }
  },
  mounted() {
    this.$store.commit("getPosts");
  }
};
</script>

<style scoped lang="scss">
.main-tiles {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .new-post-btn {
    width: 300px;
    margin-bottom: 100px;
  }

  .bottom-functionality {
    display: flex;
    justify-content: space-between;

    .part-time {
      .time {
        color: grey;
      }
    }

    .part-btns {
      button {
        margin-right: 20px;
      }
    }
  }
}
</style>
