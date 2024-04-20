import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/help",
    name: "Help",
    component: () => import("../views/Help.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/Auth.vue"),
    //     Загрузка по требованию LazyLoading
    meta: {
      layout: "auth",
      auth: false,
    },
  },
  {
    path: "/request/:id",
    name: "Request",
    component: () => import("../views/Request.vue"),
    //     Загрузка по требованию LazyLoading
    meta: {
      layout: "main",
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_VUE_APP_FB_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.auth;

  if (requiresAuth && store.getters["auth/isAuthenticated"]) {
    next();
  } else if (requiresAuth && !store.getters["auth/isAuthenticated"]) {
    next("/auth?message=auth");
  } else {
    next();
  }
});

export default router;
