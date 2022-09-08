<script setup lang="ts">
const props = defineProps({
  title: String,
});

const onClickLeft = () => {
  history.back();
}
</script>

<template>
  <van-nav-bar
      class="navigation-bar"
      :title="title"
      left-text="Назад"
      left-arrow
      @click-left="onClickLeft"
  >

    <template #right>
      <slot name="right"/>
    </template>

  </van-nav-bar>
</template>

<style scoped>
.navigation-bar {
  margin-bottom: 15px;
}
</style>
