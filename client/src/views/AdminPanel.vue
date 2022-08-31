<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { useCustomerStore } from "@/store/useCustomer";

  const route = useRoute();
  const rootPath = import.meta.env.VITE_ADMIN_PANEL_ROOT;
  const subMenu = route.matched[0].children;

  const customerStore = useCustomerStore();
  customerStore.fetchCustomers();
  console.log(customerStore.customers);
</script>

<template>
  <div v-if="route.path === `/${rootPath}`">
    <h3 class="title">Меню</h3>
    <van-cell-group inset>
      <van-cell
          v-for="item in subMenu"
          :key="item.path"
          :title="item.name"
          :to="`/${rootPath}/${item.path}`"
          is-link
      />
    </van-cell-group>
  </div>
  <router-view />
</template>

<style>
  body {
    background-color: #f7f8fa;
  }
  .van-cell {
    align-items: center;
  }
</style>

<style scoped>
  .title {
    margin: 0;
    padding: 16px 16px 16px;
    color: rgba(69,90,100,.6);
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }
</style>
