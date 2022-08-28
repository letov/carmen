import {ApolloDriver} from "@nestjs/apollo";
import {GraphQLError, GraphQLFormattedError} from "graphql/error";
import {isUndefined} from "@nestjs/common/utils/shared.utils";

const REQUEST_EXCEPTION_CODE = 'BAD_USER_INPUT';

export const GraphQLConfig ={
    driver: ApolloDriver,
    debug: true,
    playground: true,
    autoSchemaFile: 'schema.gql',
    formatError: (error: GraphQLError) => {
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