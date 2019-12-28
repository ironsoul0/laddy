import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "emotion-theming";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import Routes from "./routes";
import theme from "./styles/theme";
import store, { history } from "./store";

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URI || "http://localhost:4000/graphql"
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
