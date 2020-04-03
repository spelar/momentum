import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import modules from './modules';
import { rootSaga } from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middleware)) : composeWithDevTools(applyMiddleware(...middleware));
const configure = createStore(modules, enhancer);
sagaMiddleware.run(rootSaga);

export default configure;
