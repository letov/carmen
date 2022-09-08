<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const rootRoute = route.matched[0];
</script>

<template>
  <div class="wrapper">
    <van-nav-bar class="navigation-bar" :title="rootRoute.meta.title" />
    <van-cell-group inset>
    <span v-for="item in rootRoute.children">
      <van-cell
          v-if="!item.meta.hideInMenu"
          :key="item.path"
          :title="item.meta.title"
          :to="item.path"
          is-link
      />
    </span>
    </van-cell-group>
  </div>
</template>

<style scoped>
.navigation-bar {
  margin-bottom: 15px;
}
</style>