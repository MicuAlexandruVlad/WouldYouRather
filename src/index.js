import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/components/App.js';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducers'
import logger from './middleware/logger'

const store = createStore(reducer, applyMiddleware(thunk, logger))

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
