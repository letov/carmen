import { createRouter, createWebHistory } from "vue-router";
import AdminPanel from "../views/AdminPanel.vue";
import CustomerListPanel from "../views/CustomerListPanel.vue";
import CustomerPanel from "../views/CustomerPanel.vue";
const env = import.meta.env;

const router = createRouter({
  history: createWebHistory(env.BASE_URL),
  routes: [
    {
      path: `/${env.VITE_ADMIN_PANEL_ROOT}`,
      name: "menu",
      component: AdminPanel,
      meta: { title: "Панель администратора" },
      children: [
        {
          path: `${env.VITE_ADMIN_PANEL_CUSTOMER}`,
          name: "customers",
          component: CustomerListPanel,
          meta: { title: "Клиенты" },
          children: [
            {
              path: `:customerIdInput`,
              name: "customer",
              component: CustomerPanel,
              props: true
            },
          ],
        },
      ],
    },
  ],
});

export default router;
