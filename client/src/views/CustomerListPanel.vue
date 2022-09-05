<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { storeToRefs } from "pinia";
  import { ref } from "vue";
  import PageHeaderNavigation from "@/components/PageHeaderNavigation.vue";
  import FilterSection from "@/components/filter/FilterSection.vue";
  import PaginationSection from "@/components/pagination/PaginationSection.vue";
  import { useCustomerStore } from "@/store/useCustomer";
  import { ICustomer, CustomerDTO } from "@/store/Customer";
  import { IPagination, Pagination } from "@/components/pagination/Pagination";

  const route = useRoute();
  const routePath = `/${import.meta.env.VITE_ADMIN_PANEL_ROOT}/${import.meta.env.VITE_ADMIN_PANEL_CUSTOMER}`;
  const pageTitle = String(route.meta.title);

  const { customers, customersTotal, loading } = storeToRefs(useCustomerStore());
  let filter = ref<ICustomer>(new CustomerDTO());
  const pagination = ref<IPagination>(new Pagination());
  const { fetchCustomers } = useCustomerStore();
  const resetPagination = (currentPage = 1) => {
    pagination.value.currentPage = currentPage;
    fetchCustomers(pagination.value, filter.value);
  }
  const resetFilters = () => {
    filter.value = new CustomerDTO();
    resetPagination();
  }
  const isActive = () => route.path === routePath;

  resetPagination();
</script>

<template>
  <div>

    <transition name="slide">
      <div class="enter-parent-animation" v-if="isActive()">

        <PageHeaderNavigation
            :title="pageTitle"
        />

        <FilterSection
            @submit-filters = "resetPagination"
            @clear-filters = "resetFilters"
        >
          <template #fields>
            <van-cell-group inset>
              <van-field
                  v-model="filter.name"
                  maxlength="50"
                  label="Имя"
                  placeholder="Имя"
              />
              <van-field
                  v-model="filter.phone"
                  maxlength="50"
                  label="Телефон"
                  placeholder="Телефон"
                  type="digit"
              />
            </van-cell-group>
          </template>
        </FilterSection>

        <div v-if="loading" class="loading">
          <van-loading type="spinner" />
        </div>

        <div v-else>
          <van-cell-group inset>
            <van-swipe-cell
                v-for="customer in customers"
                :key="customer.id"
            >
              <van-card
                  :title="customer.name"
                  :desc="customer.phone"
                  class="clients__card"
                  thumb="https://katemojeikis.com/img/portfolio/main.jpg"
                  @click="this.$router.push({name: `customer`,  params: { customerIdInput: customer.id }})"
              />
              <template #right>
                <van-button square text="Delete" type="danger" class="clients__delete-button" />
              </template>
            </van-swipe-cell>
          </van-cell-group>

          <PaginationSection
              :currentPageInput="pagination.currentPage"
              :itemsPerPageInput="pagination.itemsPerPage"
              :itemsTotalInput="customersTotal"
              @change-pagination="resetPagination"
          />
        </div>

      </div>
    </transition>

    <router-view v-slot="{ Component }">
      <transition name="slide">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

</template>

<style scoped>
  .clients__card {
    margin: 0;
    background-color: @white;
  }

  .clients__delete-button {
    height: 100%;
  }
</style>
