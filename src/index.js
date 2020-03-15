import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {Provider} from 'react-redux' 
import store from './store'


const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    //cache: new InMemoryCache()
  });

ReactDOM.render(
<Provider store={store}>
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
</Provider>,
document.getElementById('root')
);
