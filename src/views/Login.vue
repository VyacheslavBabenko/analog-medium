<template>
  <section>
    <div class="container">
      <div class="columns auth">
        <div class="column is-4">
          <form @submit.prevent="login()">
            <b-field label="Email">
              <b-input
                required
                v-model="email"
                type="email"
                value=""
                maxlength="30"
              >
              </b-input>
            </b-field>

            <b-field label="Password">
              <b-input
                required
                v-model="password"
                type="password"
                value=""
                password-reveal
                minlength="3"
              >
              </b-input>
            </b-field>
            <div class="btns">
              <b-button class="enter-btn" type="is-success" native-type="submit"
                >Войти</b-button
              >
              <b-button
                tag="router-link"
                :to="{ path: '/main' }"
                class="continue-btn"
                >Продолжить без регистрации</b-button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      urlUsers: "http://localhost:3000/users",
      users: [],
      isAuth: false
    };
  },
  props: {},
  methods: {
    getUsers() {
      axios.get(this.urlUsers).then(response => {
        this.users = response.data;
      });
    },
    login() {
      this.isAuth = this.users.some(element => {
        if (element.login == this.email && element.password == this.password) {
          this.userRole = element.role;
          this.$store.commit("writeUserRole", element.role);
          this.$store.commit("writeUserId", element.id);
          return true;
        }
      });
      if (this.isAuth) {
        this.$store.commit("login");
        this.$router.push("/main");
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Неправильный логин или пароль`,
          type: "is-danger"
        });
      }
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.auth {
  display: flex;
  justify-content: center;
  margin-top: 200px;
  .btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .enter-btn {
      width: 100px;
      margin-top: 30px;
      margin-bottom: 30px;
    }

    .continue-btn {
      width: min-content;
    }
  }
}
</style>
