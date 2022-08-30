import { createRouter, createWebHistory } from "vue-router";
import AdminPanel from "../views/AdminPanel.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "adminpanel",
      component: AdminPanel,
    },
  ],
});

export default router;
