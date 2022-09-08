import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { Dialog } from "vant";

const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

const failDialog = (message: string) => {
    Dialog.alert({
        message,
        confirmButtonText: 'OK',
    });
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        let message = graphQLErrors.reduce((acc, err) => {
            return acc + err.message + '\n';
        }, '');
        failDialog(message);
    }

    if (networkError) {
        failDialog('Нет соединения с сервером');
    }
});

const appLink = from([
    errorLink, httpLink
])

const apolloClient = new ApolloClient({
    link: appLink,
    cache: new InMemoryCache({
        addTypename: false,
    }),
    connectToDevTools: true,
});

export default apolloClient;
