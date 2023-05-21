import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import multi from 'redux-multi'; // permite executar vários reducers simultaneamente
import promise from 'redux-promise'; // aguarda a promisse se resolver antes de chamar o reducer
import thunk from 'redux-thunk'; //permite retornar funções, em vez de apenas ações, dentro do Redux. Isso permite ações com atraso, incluindo trabalhar com promises

import reducers from './main/reducers';
import AuthOrApp from './main/AuthOrApp';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools);

ReactDom.render(
  <Provider store={store}>
    <AuthOrApp />
  </Provider>,
  document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
