import { defineStore } from "pinia";
import apolloClient from "@/plugins/apollo";
import gql from "graphql-tag";
import { Dialog } from "vant";
import 'vant/es/dialog/style';
import type { IPagination } from "@/components/pagination/Pagination";
import type { ICustomer } from "@/store/Customer";
import { CustomerDTO } from "@/store/Customer";

const failDialog = async () => {
    await Dialog.alert({
        message: 'Нет соединения с сервером',
        confirmButtonText: 'OK',
    });
}

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        customers: [] as ICustomer[],
        customersTotal: 0,
        loading: false,
        customer: new CustomerDTO() as ICustomer,
    }),
    getters: {

    },
    actions: {
        fetchCustomers: async function (pagination: IPagination, filter: ICustomer) {
            this.customers = [];
            this.customersTotal = 0;
            this.loading = true;
            await apolloClient.query({
                query: gql`
                    query GetCustomerPagination($skip: Int, $take: Int, $name: String, $phone: String) {
                        customersPagination(skip: $skip, take: $take, name: $name, phone: $phone) {
                            customers {
                                id
                                name
                                phone
                            }
                            total
                        }
                    }
                `,
                variables: {
                    "skip": pagination.skip(),
                    "take": pagination.take(),
                    "name": filter.name,
                    "phone": filter.phone
                }
            })
            .then(({data}) => {
                this.customers = data.customersPagination.customers;
                this.customersTotal = data.customersPagination.total;
                this.loading = false;
            })
            .catch(() => {
                failDialog();
                this.loading = false;
            });
        },
        fetchCustomer: async function (customerId: number) {
            this.customer = new CustomerDTO();
            if (isNaN(customerId)) {
                return;
            }
            this.loading = true;
            await apolloClient.query({
                query: gql`
                    query Query($customerId: Float!) {
                        customer(id: $customerId) {
                            id
                            name
                            phone
                        }
                    }
                `,
                variables: {
                    "customerId": customerId,
                }
            })
            .then(({data}) => {
                this.customer = data.customer;
                this.loading = false;
            })
            .catch(() => {
                failDialog();
                this.loading = false;
            });
        },
    },
})
