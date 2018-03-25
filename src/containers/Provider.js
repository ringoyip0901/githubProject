import React from 'react';
import ReactDOM from 'react-dom';
import store from '../store.js';
import MainContainer from './MainContainer.js';
import 'bootstrap/dist/css/bootstrap.css';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

render(
  <Provider store={store}>
    <MainContainer />
  </Provider>,
  document.getElementById("app")
);