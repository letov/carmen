<script setup lang="ts">
import { ref, watch } from "vue";
import PageHeaderNavigation from "@/components/PageHeaderNavigation.vue";
import { storeToRefs } from "pinia";
import { useCustomerStore } from "@/store/useCustomer";
import { Customer, CustomerDTO } from "@/store/Customer";
import { Dialog } from "vant";
import type { UploaderFileListItem } from "vant/lib/uploader/types";

const props = defineProps({
  customerIdInput: String,
})

const { fetchCustomer, deleteCustomer, createCustomer, updateCustomer } = useCustomerStore();
const editedCustomer = ref(new CustomerDTO());
const isNewUser = () => editedCustomer.value.id === null;
const uploadFile = ref([]);

fetchCustomer(Number(props.customerIdInput));
const { customer, loading } = storeToRefs(useCustomerStore());
watch(() => props.customerIdInput, (value) => {
  fetchCustomer(Number(value));
}, { deep: true });
watch(customer, (value) => {
  editedCustomer.value = value ? new Customer(value) : new CustomerDTO();
}, { deep: true });

const _deleteCustomer = () => {
  if (isNewUser()) {
    return;
  }
  const id = Number(editedCustomer.value.id);
    Dialog.confirm({
      title: 'Удалить клиента',
      confirmButtonText: 'OK',
      cancelButtonText: 'Отмена',
    })
        .then(() => deleteCustomer(id))
        .then((result) => {
          if (result) {
            history.back();
          }
        })
}
const _editCustomer = () => {
  if (isNewUser()) {
    createCustomer(editedCustomer.value)
        .then((result: boolean) => {
          if (result) {
            history.back();
          }
        });
  } else {
    updateCustomer(editedCustomer.value)
        .then((result: boolean) => {
          if (result) {
            fetchCustomer(Number(props.customerIdInput));
            history.back();
          }
        });
  }
}
const validateMimeType = (mimetype: string): boolean => {
  const validMimeTypes = import.meta.env.VITE_UPLOAD_VALID_MIME_TYPES.split(' ');
  return validMimeTypes.includes(mimetype);
}
const beforeRead = (file: File) => {
  if (!validateMimeType(file.type)) {
    Dialog.alert({
      message: 'Invalid file type',
      confirmButtonText: 'OK',
    });
    return false;
  }
  return true;
};
const afterRead = (file: UploaderFileListItem) => {
  editedCustomer.value.uploadImage = file.file;
  file.status = 'uploading';
  file.message = 'Загрузка...';
  setTimeout(() => {
    file.status = 'done';
    file.message = '';
  }, 1000);
};
</script>

<template>
  <div class="wrapper">

    <PageHeaderNavigation
        :title="isNewUser() ? 'Добавление нового клиента' : customer.name"
    />

    <div v-if="loading" class="loading">
      <van-loading type="spinner" />
    </div>

    <div v-else>
      <div class="avatar">
        <van-uploader v-model="uploadFile" :before-read="beforeRead" :after-read="afterRead" :max-count="1"/>
      </div>
      <van-cell-group inset>
        <van-field v-model="editedCustomer.name" label="Имя" />
        <van-field v-model="editedCustomer.phone" type="tel" label="Телефон" />
      </van-cell-group>

      <div class="buttons-group">
        <van-button round plain type="primary" @click="_editCustomer">
          Сохранить
        </van-button>
        <van-button v-if="!isNewUser()" round plain type="danger" @click="_deleteCustomer">
          Удалить
        </van-button>
      </div>

    </div>

  </div>
</template>

<style scoped>
.avatar {
  padding: 10px 0px 20px;
  text-align: center;
}
</style>