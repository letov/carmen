import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import apolloClient from "@/plugins/apollo";
import { createApolloProvider } from "@vue/apollo-option";
import { Dialog } from 'vant';
import { Uploader } from 'vant';

createApp(App)
    .use(createPinia())
    .use(createApolloProvider({
        defaultClient: apolloClient,
    }))
    .use(Uploader)
    .use(router)
    .use(Dialog)
    .mount("#app");
