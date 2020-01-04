import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "emotion-theming";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";

import Routes from "./routes";
import theme from "./styles/theme";
import store, { history } from "./store";

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URI || "http://192.168.1.102:4000/graphql",
  cache: new InMemoryCache(),
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>
);

export default App;
