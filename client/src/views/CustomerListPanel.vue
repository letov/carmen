<script setup lang="ts">
import PageHeaderNavigation from "@/components/PageHeaderNavigation.vue";
import FilterSection from "@/components/FilterSection.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import type { ICustomer } from "@/store/Customer";
import { CustomerDTO } from "@/store/Customer";
import type { IPagination } from "@/components/pagination/Pagination";
import { Pagination } from "@/components/pagination/Pagination";
import { storeToRefs } from "pinia";
import { useCustomerStore } from "@/store/useCustomer";
import PaginationSection from "@/components/pagination/PaginationSection.vue";
import { Dialog } from "vant";

const route = useRoute();
const router = useRouter();
const filter = ref<ICustomer>(new CustomerDTO());
const pagination = ref<IPagination>(new Pagination());
const { customers, customersTotal, loading } = storeToRefs(useCustomerStore());
const { fetchCustomers, deleteCustomer } = useCustomerStore();
const newCustomerPath = `/${import.meta.env.VITE_ADMIN_PANEL_ROOT}/${import.meta.env.VITE_ADMIN_PANEL_CUSTOMER}/new`;

const resetPagination = (currentPage = 1) => {
  pagination.value.currentPage = currentPage;
  fetchCustomers(pagination.value, filter.value);
}
const resetFilters = () => {
  filter.value = new CustomerDTO();
  resetPagination();
}
const _deleteCustomer = (id: number) => {
  Dialog.confirm({
    title: 'Удалить клиента',
    confirmButtonText: 'OK',
    cancelButtonText: 'Отмена',
  })
      .then(() => deleteCustomer(id))
      .then((result) => {
        if (result) {
          resetPagination(pagination.value.currentPage);
        }
      })
}

resetPagination();
</script>

<template>
  <div class="wrapper">

    <PageHeaderNavigation
        :title="route.meta.title"
    >
      <template #right>
        <van-icon name="plus" @click="router.push({path: newCustomerPath})" />
      </template>
    </PageHeaderNavigation>

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
              @click="router.push({name: `customer`,  params: { customerIdInput: customer.id }})"
          />
          <template #right>
            <van-button
                square
                text="Удалить"
                type="danger"
                class="clients__delete-button"
                @click="_deleteCustomer(customer.id)"
            />
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
</template>

<style scoped>
.clients__card {
  margin: 0;
  background-color: #fff;
}

.clients__delete-button {
  height: 100%;
}
</style>