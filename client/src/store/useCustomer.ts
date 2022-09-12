import { defineStore } from "pinia";
import apolloClient from "@/plugins/apollo";
import gql from "graphql-tag";
import { Dialog } from "vant";
import 'vant/es/dialog/style';
import type { IPagination } from "@/components/pagination/Pagination";
import type { ICustomer } from "@/store/Customer";
import { CustomerDTO, CustomerInput } from "@/store/Customer";

const failDialog = (message: string) => {
    Dialog.alert({
        message,
        confirmButtonText: 'OK',
    }).then(() => {});
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
        fetchCustomers: function (pagination: IPagination, filter: ICustomer) {
            this.customers = [];
            this.customersTotal = 0;
            this.loading = true;
            apolloClient.query({
                query: gql`
                    query GetCustomerPagination($skip: Int, $take: Int, $name: String, $phone: String) {
                        customersPagination(skip: $skip, take: $take, name: $name, phone: $phone) {
                            customers {
                                id
                                name
                                phone
                                image
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
            })
            .catch(() => {})
                // @ts-ignore
            .finally(() => {
                this.loading = false;
            })
        },
        fetchCustomer: function (customerId: number) {
            this.customer = new CustomerDTO();
            if (isNaN(customerId)) {
                return;
            }
            this.loading = true;
            apolloClient.query({
                query: gql`
                    query Query($customerId: Float!) {
                        customer(id: $customerId) {
                            id
                            name
                            phone
                            image
                        }
                    }
                `,
                variables: {
                    "customerId": customerId,
                }
            })
            .then(({data}) => {
                this.customer = data.customer;
            })
            .catch(() => {})
                // @ts-ignore
            .finally(() => {
                this.loading = false;
            })
        },
        deleteCustomer: function (customerId: number) {
            if (isNaN(customerId)) {
                return;
            }
            this.loading = true;
            return apolloClient.mutate({
                mutation: gql`
                    mutation Mutation($customerId: Float!) {
                        deleteCustomer(id: $customerId)
                    }
                `,
                variables: {
                    "customerId": customerId,
                }
            })
            .then(({data}) => {
                if (!data.deleteCustomer) {
                    failDialog('Пользователь не удален');
                } else {
                    return apolloClient.clearStore().then(() => true);
                }
            })
            .catch(() => {})
                // @ts-ignore
            .finally(() => {
                this.loading = false;
            })
        },
        createCustomer: function (customer: ICustomer) {
            this.loading = true;
            return apolloClient.mutate({
                mutation: gql`
                    mutation Mutation($customerInput: CustomerInput!) {
                        createCustomer(customerInput: $customerInput) {
                            id
                        }
                    }
                `,
                variables: {
                    "customerInput": new CustomerInput(customer)
                }
            })
            .then(({data}) => {
                if (!data.createCustomer) {
                    failDialog('Пользователь не создан');
                } else {
                    return apolloClient.clearStore().then(() => true);
                }
            })
            .catch(() => {})
                // @ts-ignore
            .finally(() => {
                this.loading = false;
            })
        },
        updateCustomer: function (customer: ICustomer) {
            this.loading = true;
            return apolloClient.mutate({
                mutation: gql`
                    mutation Mutation($id: Float!, $customerInput: CustomerInput!) {
                        updateCustomer(id: $id, customerInput: $customerInput)
                    }
                `,
                variables: {
                    "id": customer.id,
                    "customerInput": new CustomerInput(customer)
                }
            })
            .then(({data}) => {
                if (!data.updateCustomer) {
                    failDialog('Пользователь не изменен');
                } else {
                    return apolloClient.clearStore().then(() => true);
                }
            })
            .catch(() => {})
                // @ts-ignore
            .finally(() => {
                this.loading = false;
            })
        },
    },
})
