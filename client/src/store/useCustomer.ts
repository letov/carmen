import { defineStore } from "pinia";
import apolloClient from "@/plugins/apollo";
import gql from "graphql-tag";
import { LocalStorage } from 'ttl-localstorage';

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        customers: LocalStorage.get("customers", {}),
        test: 'asd',
    }),
    getters: {

    },
    actions: {
        fetchCustomers() {
            apolloClient
                .query({
                    query: gql`
                        query {
                            customers {
                                id
                            }
                        }
                    `,
                })
                .then(({ data }) => {
                    this.customers = data;
                    LocalStorage.put("customers", this.customers, Number(import.meta.env.VITE_LOCAL_STORAGE_TTL));
                });
        },
    },
})
