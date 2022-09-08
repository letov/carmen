<script setup lang="ts">
import { ref, watch } from "vue";
import type { SwipeInstance } from "vant";

const props = defineProps({
  swipePage: Number
})

watch(() => props.swipePage, (value) => {
  console.log(value)
  if (Number(value) === 0 ) {
    //swipeRef.value?.prev();
  } else {
    swipeRef.value?.next();
  }
});

const swipeRef = ref<SwipeInstance>();

</script>

<template>
  <van-swipe
      ref="swipeRef"
      :touchable="false"
      :loop="false"
      :show-indicators="false"
      :initial-swipe="swipePage"
  >
    <van-swipe-item>
      <slot name="parentPage" />
    </van-swipe-item>
    <van-swipe-item>
      <slot name="childPage" />
    </van-swipe-item>
  </van-swipe>
</template>