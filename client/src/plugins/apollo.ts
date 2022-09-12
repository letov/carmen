import { ApolloClient, from, InMemoryCache } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { Dialog } from "vant";
import createUploadLink from "apollo-upload-client/public/createUploadLink";


const uploadLink = createUploadLink({
    uri: `${import.meta.env.VITE_SERVER_URL}/graphql`,
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
    errorLink, uploadLink
])

const apolloClient = new ApolloClient({
    link: appLink,
    cache: new InMemoryCache({
        addTypename: false,
    }),
    connectToDevTools: true,
});

export default apolloClient;
