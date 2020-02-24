import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import errorsReducer from './errorsReducer';
import stockReducer from './stockReducer';
import userStockReducer from './userStockReducer'

export default combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
  stock: stockReducer,
  userStocks: userStockReducer
})