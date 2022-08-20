import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import User from "../components/users/User.vue";
import Role from "../components/roles/Role.vue";
import AddUser from "../components/users/Add.vue";
import AddRole from "../components/roles/Add.vue";
import EditUser from "../components/users/Edit.vue";
import EditRole from "../components/roles/Edit.vue";
import Post from "@/components/posts/Post.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/users",
    name: "Users",
    component: User,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/AddUser",
    name: "AddUser",
    component: AddUser,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/users/:id/edit",
    name: "EditUseer",
    component: EditUser,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/roles",
    name: "Roles",
    component: Role,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/roles/:id/edit",
    name: "EditRole",
    component: EditRole,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/roles/create",
    name: "AddRole",
    component: AddRole,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/posts",
    name: "Post",
    component: Post,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  linkExactActiveClass: "",
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.params.pageTitle !== undefined) {
    document.title = `${to.name} | ${to.params.pageTitle} | ${process.env.VUE_APP_TITLE}`;
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    store.state.auth.loggedIn ? next() : next("/login");
  } else if (to.matched.some((record) => record.meta.requiresAuth) === false) {
    if (store.state.auth.loggedIn === false) {
      next();
    } else {
      next("/");
    }
  }
});
export default router;
