import {ApolloDriver} from "@nestjs/apollo";
import {GraphQLError, GraphQLFormattedError} from "graphql/error";

const REQUEST_EXCEPTION_CODE = 'BAD_USER_INPUT';

export const GraphQLConfig ={
    driver: ApolloDriver,
    debug: process.env.NODE_ENV !== 'production',
    playground: process.env.NODE_ENV !== 'production',
    autoSchemaFile: 'schema.gql',
    formatError: (error: GraphQLError) => {
        console.log(error)
        let graphQLFormattedError: GraphQLFormattedError;
        if (REQUEST_EXCEPTION_CODE === error.extensions?.code) {
            graphQLFormattedError = { message: error.extensions?.response['message'].join('\n') };
        } else {
            const downcastError = <Error>error;
            graphQLFormattedError = { message: downcastError.message };
        }
        return graphQLFormattedError;
    },
}