import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/profile/:username",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
      // beforeEnter: (to, from, next) => {
      //   if (localStorage.getItem("sb-adpemyndbifiuvcexvuh-auth-token")) {
      //     next();
      //   } else {
      //     next("/login");
      //   }
      // },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("sb-adpemyndbifiuvcexvuh-auth-token")) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("sb-adpemyndbifiuvcexvuh-auth-token")) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/:catchall(.*)",
      name: "not found",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;
