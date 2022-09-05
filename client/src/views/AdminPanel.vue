<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import 'vant/es/dialog/style';

  const route = useRoute();
  const rootPath = import.meta.env.VITE_ADMIN_PANEL_ROOT;
  const subMenu = route.matched[0].children;
  const isRootPath = () => route.path === '/' + rootPath;
</script>

<template>

  <transition name="slide">
    <div class="enter-parent-animation" v-if="isRootPath()">
      <van-nav-bar class="navigation-bar" :title="route.meta.title" />
      <van-cell-group inset>
        <van-cell
            v-for="item in subMenu"
            :key="item.path"
            :title="item.meta.title"
            :to="`/${rootPath}/${item.path}`"
            is-link
        />
      </van-cell-group>
    </div>
  </transition>

  <router-view v-slot="{ Component }">
    <transition name="slide">
      <component :is="Component" />
    </transition>
  </router-view>

</template>

<style scoped>
  .navigation-bar {
    margin-bottom: 15px;
  }
</style>