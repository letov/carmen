import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import apolloClient from "@/plugins/apollo";
import { createApolloProvider } from "@vue/apollo-option";

createApp(App)
    .use(createPinia())
    .use(createApolloProvider({
        defaultClient: apolloClient,
    }))
    .use(router)
    .mount("#app");
