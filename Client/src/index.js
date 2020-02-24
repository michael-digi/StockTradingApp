import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import configureStore from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkLoggedIn } from "./utils/routeAuth";

let preloadedState = {};
const store = configureStore(preloadedState);

console.log(store.getState());

ReactDOM.render( 
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.querySelector('#root')
);

