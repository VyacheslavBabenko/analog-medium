<template>
  <b-navbar>
    <template slot="end">
      <b-navbar-item
        v-if="!$store.getters.ISAUTH"
        tag="router-link"
        :to="{ path: '/' }"
      >
        <div class="buttons">
          <a class="button is-primary">
            Логин
          </a>
        </div>
      </b-navbar-item>
      <b-navbar-item v-if="$store.getters.ISAUTH" @click="logout()">
        <div class="buttons">
          <a class="button is-primary">
            Выйти
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  props: {},
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$store.commit("deleteUserRole");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
