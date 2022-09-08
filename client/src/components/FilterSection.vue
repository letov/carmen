<script setup lang="ts">
const emit = defineEmits(['submit-filters', 'clear-filters']);
</script>

<template>
    <slot name="fields" />
    <div class="buttons-group">
      <van-button round plain type="primary" @click="emit('submit-filters')">
        Применить
      </van-button>
      <van-button round plain type="danger" @click="emit('clear-filters')">
        Отменить
      </van-button>
    </div>
</template>