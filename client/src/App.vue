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

  .buttons-group {
    display: flex;
    margin: 16px;
    gap: 16px;
    justify-content: center;
  }

  .van-uploader__upload-icon,
  .van-uploader__preview-delete-icon{
    font-size: 50px !important;
  }
</style>