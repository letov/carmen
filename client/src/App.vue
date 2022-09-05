<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
  body {
    background-color: #f7f8fa;
  }

  .loading {
    justify-content: center;
    display: flex;
  }

  .slide-enter-active {
    transition: 0.5s;
  }
  .slide-enter-from {
    transform: translate(100%, 0);
  }
  .slide-enter-to {
    transform: translate(0, 0);
  }

  .enter-parent-animation.slide-enter-active {
    transition: 0.5s;
  }
  .enter-parent-animation.slide-enter-from {
    transform: translate(-100%, 0);
  }
  .enter-parent-animation.slide-enter-to {
    transform: translate(0, 0);
  }
</style>