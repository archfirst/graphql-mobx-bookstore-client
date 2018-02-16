import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from 'react-apollo';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'mobx-react';
import { HistoryAdapter } from 'mobx-state-router';
import { RootStore } from './shared/stores';
import { history } from './shared/utils';
import { Shell } from './shell';

const palette = {
    primary: {
        main: blue[500]
    },
    secondary: {
        main: pink.A400
    },
    error: {
        main: red.A400
    }
};

// Create the rootStore
const rootStore = new RootStore();
rootStore.init();

// Observe history changes
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
historyAdapter.observeRouterStateChanges();

// Create an http link
const httpLink = new HttpLink({
    uri: 'http://localhost:8080/graphql'
});

// Create a WebSocket link
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:8080/subscriptions',
    options: {
        reconnect: true
    }
});

// Using the ability to split links, send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
);

// Create the Apollo client
const apolloClient = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});

export class App extends React.Component {
    render() {
        const theme = createMuiTheme({ palette });

        return (
            <ApolloProvider client={apolloClient}>
                <MuiThemeProvider theme={theme}>
                    <Provider rootStore={rootStore}>
                        <Shell />
                    </Provider>
                </MuiThemeProvider>
            </ApolloProvider>
        );
    }
}
