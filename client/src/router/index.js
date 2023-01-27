import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout";
import BlankLayout from "@/layouts/BlankLayout";
import HomeView from "@/views/HomeView";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "Home",
    component: MainLayout,
    children: [{ path: "/home", name: "Home", component: HomeView }],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "Auth",
    component: BlankLayout,
    children: [
      { path: "/login", name: "Login", component: LoginView },
      { path: "/register", name: "Register", component: RegisterView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
