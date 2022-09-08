import { createRouter, createWebHistory } from "vue-router";
import AdminPanel from "../views/AdminPanel.vue";
import CustomerListPanel from "../views/CustomerListPanel.vue";
import CustomerPanel from "../views/CustomerPanel.vue";
import AdminMenu from "../views/AdminMenu.vue";
const env = import.meta.env;

const router = createRouter({
  history: createWebHistory(env.BASE_URL),
  routes: [
    {
      path: `/${env.VITE_ADMIN_PANEL_ROOT}`,
      name: "admin-panel",
      component: AdminPanel,
      meta: {
        title: "Панель администратора",
      },
      redirect: to => {
        return { name: 'menu'}
      },
      children: [
        {
          path: `${env.VITE_ADMIN_PANEL_MENU}`,
          name: "menu",
          component: AdminMenu,
          meta: {
            title: "Меню",
            hideInMenu: true,
          },
        },
        {
          path: `${env.VITE_ADMIN_PANEL_CUSTOMER}`,
          name: "customers",
          component: CustomerListPanel,
          meta: {
            title: "Клиенты",
          },
        },
        {
          path: `${env.VITE_ADMIN_PANEL_CUSTOMER}/:customerIdInput`,
          name: "customer",
          component: CustomerPanel,
          meta: {
            hideInMenu: true,
          },
          props: true
        },
      ],
    },
  ],
});

export default router;
