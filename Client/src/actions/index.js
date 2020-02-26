import { RECEIVE_CURRENT_USER,
         LOGOUT_CURRENT_USER,
         PURCHASE_STOCK,
         LOAD_USER_STOCK_INFO } from './types';

//adds either a logged in user or a user who just registered to the express sessions
export const receiveCurrentUser = user => {
  return {
    type: RECEIVE_CURRENT_USER,
    payload: user
  }
}
//destroys a user session by logging them out
export const logoutCurrentUser = user => {
  return {
    type: LOGOUT_CURRENT_USER
  }
}
//called when the "Invest" button is pushed on the ticker/shares box
export const purchaseStock = stock => {
  return {
    type: PURCHASE_STOCK,
    payload: stock
  }
}
//called to load user's personal stock info (transactions, stocks)
export const loadUserStockInfo = userStockInfo => {
  return {
    type: LOAD_USER_STOCK_INFO,
    payload: userStockInfo
  }
}
