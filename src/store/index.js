import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isAuth: false,
        userRole: null,
        posts: [],
        postToEdit: null,
        userId: null
    },
    getters: {
        ISAUTH: state => {
            return state.isAuth;
        },
        USERROLE: state => {
            return state.userRole;
        },
        POSTS: state => {
            return state.posts;
        },
        POSTSLENGTH: state => {
            return state.posts.length;
        },
        POSTTOEDIT: state => {
            return state.postToEdit;
        },
        USERID: state => {
            return state.userId;
        }

    },
    mutations: {
        login(state) {
            state.isAuth = true;
        },
        logout(state) {
            state.isAuth = false;
        },
        writeUserRole(state, role) {
            state.userRole = role;
        },
        deleteUserRole(state) {
            state.userRole = null;
        },
        writeUserId(state, id) {
            state.userId = id;
        },
        async getPosts(state) {
            await axios.get("http://localhost:3000/posts").then(response => {
                state.posts = response.data;
            });
        },
        editPost(state, post) {
            state.postToEdit = post;
        }
    },
    actions: {},
});