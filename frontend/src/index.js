import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './styles/style.scss';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configure';
import { Provider } from 'react-redux';
import App from './App';
import 'index.css';

ReactDOM.render(
	<Provider store={configureStore}>
		<BrowserRouter >
      <Route path="/" component={App}/>
    </BrowserRouter>
	</Provider>,
document.getElementById('root'));

serviceWorker.unregister();

