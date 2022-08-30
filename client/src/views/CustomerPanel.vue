<script setup lang="ts">
import { useRoute } from 'vue-router'
const pageTitle = useRoute().name;
const onClickLeft = () => history.back();
</script>

<template>
  <van-nav-bar
      :title="pageTitle"
      left-text="Назад"
      left-arrow
      @click-left="onClickLeft"
  >
    <template #right>
      <van-icon name="plus" />
    </template>
  </van-nav-bar>
  <van-cell-group class="clients" inset>
    <van-cell
        is-link
    >
      <template #title>
        <div class="clients__title">
          <van-image
              class="clients__avatar"
              round
              width="50px"
              height="50px"
              fit="cover"
              src="https://katemojeikis.com/img/portfolio/main.jpg"
          />
          <div>
            <span>Екатерина</span>
            <div class="van-cell__label">+7963665523</div>
          </div>
        </div>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<style scoped>
.clients {
  margin-top: 15px;
}
.clients__avatar {
  vertical-align: middle;
}
.clients__title {
  display: flex;
  gap: 15px;
}
</style>
