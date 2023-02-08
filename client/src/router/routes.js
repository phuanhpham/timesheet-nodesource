import MainLayout from "@/layouts/MainLayout";
import BlankLayout from "@/layouts/BlankLayout";
import HomeView from "@/views/HomeView";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import TimesheetsView from "@/views/TimesheetsView";
import RequestsView from "@/views/RequestsView";

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "Home",
    component: MainLayout,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          title: "Home",
        },
        component: HomeView,
      },
      {
        path: "/timesheets",
        name: "Timesheets",
        meta: {
          title: "Timesheets",
        },
        component: TimesheetsView,
      },
      {
        path: "/requests",
        name: "Requests",
        meta: {
          title: "Requests",
        },
        component: RequestsView,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "Auth",
    meta: {
      title: "Timesheet Home",
    },
    component: BlankLayout,
    children: [
      {
        path: "/login",
        name: "Login",
        meta: {
          title: "Timesheet Login",
        },
        component: LoginView,
      },
      {
        path: "/register",
        name: "Register",
        meta: {
          title: "Timesheet Register",
        },
        component: RegisterView,
      },
    ],
  },
];

export default routes;
