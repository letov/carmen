<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  currentPageInput: Number,
  itemsPerPageInput: Number,
  itemsTotalInput: Number,
});

let currentPage = ref(props.currentPageInput);

const emit = defineEmits(['change-pagination']);
</script>

<template>
  <div class="pagination">
    <van-pagination
        v-model="currentPage"
        :items-per-page="itemsPerPageInput"
        :total-items="itemsTotalInput"
        @change="emit('change-pagination', currentPage)"
    >

      <template #prev-text>
        <van-icon name="arrow-left" />
      </template>

      <template #next-text>
        <van-icon name="arrow" />
      </template>

    </van-pagination>
  </div>
</template>

<style scoped>
  .pagination {
    margin: 16px;
  }
</style>
