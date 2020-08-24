import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    // 首页路由
    path: "/",
    name: "home",
    component: () => import("@/views/Home"),
  },
  {
    // 分类路由
    path: "/two",
    name: "two",
    component: () => import("@/views/Two"),
  },
  {
    // 购物车路由
    path: "/cart",
    name: "cart",
    component: () => import("@/views/Cart"),
  },
  {
    // 登录页面
    path: "/user",
    name: "user",
    component: () => import("@/views/User"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
