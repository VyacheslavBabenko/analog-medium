import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";
import Edit from "../views/Edit.vue";
import NewPost from "../views/NewPost.vue";

Vue.use(VueRouter);


const routes = [{
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/main",
    name: "main",
    component: Main
  },
  {
    path: "/edit",
    name: "edit",
    component: Edit
  },
  {
    path: "/new-post",
    name: "new-post",
    component: NewPost
  }
];

const router = new VueRouter({
  routes
});

export default router;