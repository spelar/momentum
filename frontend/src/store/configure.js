import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootSaga } from './sagas/rootSaga';
import rootReducer from './modules';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middleware)) : composeWithDevTools(applyMiddleware(...middleware));
const configure = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

export default configure;
