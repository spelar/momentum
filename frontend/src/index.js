import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './styles/style.scss';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configure';
import { Provider } from 'react-redux';
import App from './App';
import 'index.css';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter >
      <Route path="/" component={App}/>
    </BrowserRouter>
	</Provider>,
document.getElementById('root'));

serviceWorker.unregister();

