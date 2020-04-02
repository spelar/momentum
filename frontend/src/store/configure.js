import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import modules from './modules';
import {composeWithDevTools} from 'redux-devtools-extension';
import { rootSaga } from './sagas/rootSaga';

const configureStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = [
    applyMiddleware(
      sagaMiddleware
    ),
    composeWithDevTools()
  ];

  const store = createStore(modules, initialState, compose(...enhancers));

  sagaMiddleware.run(rootSaga);


  return store;
};

export default configureStore;
