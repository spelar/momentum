import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import modules from './modules';
import { rootSaga } from './sagas/rootSaga';

const isDev = process.env.NODE_ENV === 'development' || true;

const devtools = isDev && window.devToolsExtension
  ? window.devToolsExtension
  : () => fn => fn;

const configureStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = [
    applyMiddleware(
      sagaMiddleware
    ),
    devtools()
  ];

  const store = createStore(modules, initialState, compose(...enhancers));

  sagaMiddleware.run(rootSaga);

  if(module.hot) {
    module.hot.accept('./modules', () => store.replaceReducer(modules));
  }

  return store;
};

export default configureStore;
