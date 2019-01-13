import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers/index';


const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    promiseMiddleware(),
    logger
  )
);

const Store = (props) =>
  <Provider store={store}>
    {props.children}
  </Provider>

export default Store;
