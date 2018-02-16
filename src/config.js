import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';

export const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_HTTP_URI
});

export const webSocketLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_WS_URI
});
