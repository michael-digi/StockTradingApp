import { createStore, applyMiddleware } from "redux";
import reducers from './reducers';
import thunk from 'redux-thunk';

export default preloadedState => (
  createStore(
    reducers,
    preloadedState,
    applyMiddleware(thunk)
  )
);