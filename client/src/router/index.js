import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const DEFAULT_TITLE = "TimeSheet";
const ROUTES_NAME_RULE = ["Login", "Register"];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !localStorage.getItem("userAuth")) {
    next({ name: "Register" });
  } else if (
    ROUTES_NAME_RULE.includes(to.name) &&
    localStorage.getItem("userAuth")
  ) {
    next({ name: "Home" });
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
