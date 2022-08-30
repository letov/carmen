import { createRouter, createWebHistory } from "vue-router";
import AdminPanel from "../views/AdminPanel.vue";
import CustomerPanel from "../views/CustomerPanel.vue";
const env = import.meta.env;

const router = createRouter({
  history: createWebHistory(env.BASE_URL),
  routes: [
    {
      path: `/${env.VITE_ADMIN_PANEL_ROOT}`,
      name: "Панель администратора",
      component: AdminPanel,
      children: [
        {
          path: `${env.VITE_ADMIN_PANEL_CUSTOMER}`,
          name: "Клиенты",
          component: CustomerPanel,
        },
      ],
    },
  ],
});

export default router;
