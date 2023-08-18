import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import App from './App';
import { ThemeProvider } from '@mui/material';
import theme from './mui/theme';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

import "./Styles/fonts.css"
import "./Styles/index.css"

const client = new ApolloClient({
  uri: process.env.REACT_APP_MOVIE_API,
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </ThemeProvider>
);

