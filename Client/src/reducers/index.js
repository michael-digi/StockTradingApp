import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import stockReducer from './stockReducer';
import userStockReducer from './userStockReducer';

export default combineReducers({
  session: sessionReducer,
  stock: stockReducer,
  userStocks: userStockReducer
})