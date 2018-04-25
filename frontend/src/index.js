import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'styles/style.scss';
import registerServiceWorker from './registerServiceWorker';
import configureStore from 'store/configure';
import { AppContainer as HotContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from 'components/App';
import 'index.css';

const store = configureStore();

const Root = ({store}) => {
  return (
    <Provider store={store}>
      <BrowserRouter >
        <Route path="/" component={App}/>
      </BrowserRouter>
    </Provider>
  );
};

const render = (Component) => ReactDOM.render(
  (
    <HotContainer>
      <Component store={store}/>
    </HotContainer>
  ),
  document.getElementById('root')
);

render(Root);

if(module.hot) {
  module.hot.accept(Root, () => render(Root))
}

registerServiceWorker();
