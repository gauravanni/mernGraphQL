import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import App from './components/socialAuth';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory'



const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    //cache: new InMemoryCache()
  });

ReactDOM.render(
<ApolloProvider client={client}>
    <App />
</ApolloProvider>,
document.getElementById('root')
);
