<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";

const transitionName = ref('slide-right');
router.afterEach((to, from) => {
  if (to.name === "menu") {
    transitionName.value = 'slide-right';
    return;
  }
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  transitionName.value = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="less">

.wrapper {
  width: 100%;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: 0.5s;
}

.hide-at-right() {
  position: absolute;
  transform: translate(100%, 0);
}

.show-from-right() {
  transform: translate(0, 0);
}

.hide-at-left() {
  position: absolute;
  transform: translate(-100%, 0);
}

.show-from-left() {
  transform: translate(0, 0);
}

// slide-left

.slide-left-enter-to {
  .show-from-right()
}

.slide-left-enter-from {
  .hide-at-right()
}

.slide-left-leave-to {
  .hide-at-left()
}
.slide-left-leave-from {
  .show-from-left()
}

// slide-right

.slide-right-enter-to {
  .show-from-left()
}

.slide-right-enter-from {
  .hide-at-left()
}

.slide-right-leave-to {
  .hide-at-right()
}
.slide-right-leave-from {
  .show-from-right()
}

</style>