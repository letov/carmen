<script setup lang="ts">
import { ref, watch } from "vue";

  const props = defineProps({
    customerIdInput: String,
  })
  import PageHeaderNavigation from "@/components/PageHeaderNavigation.vue";
  import { storeToRefs } from "pinia";
  import { useCustomerStore } from "@/store/useCustomer";
  import { Customer, CustomerDTO } from "@/store/Customer";

  const customerId = ref(props.customerIdInput);
  const { customer, loading } = storeToRefs(useCustomerStore());
  const isNewUser = () => customer.value.id === null;
  const { fetchCustomer } = useCustomerStore();
  fetchCustomer(Number(customerId.value));

  const editCustomer = ref(new CustomerDTO());
  watch(customer, (value) => {
    editCustomer.value = new Customer(value);
  }, { deep: true });

</script>
<template>
  <div>
    {{ editCustomer }}
    <PageHeaderNavigation
        :title="isNewUser() ? 'Добавление нового клиента' : customer.name"
    />

    <div v-if="loading" class="loading">
      <van-loading type="spinner" />
    </div>

    <div v-else>
      <van-cell-group inset>
        <van-field v-model="editCustomer.name" label="Имя" />
        <van-field v-model="editCustomer.phone" type="tel" label="Телефон" />
      </van-cell-group>
    </div>
  </div>
</template>