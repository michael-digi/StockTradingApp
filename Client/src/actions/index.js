import { RECEIVE_CURRENT_USER,
         LOGOUT_CURRENT_USER,
         RECEIVE_ERRORS,
         CLEAR_ERRORS,
         PURCHASE_STOCK,
         LOAD_USER_STOCK_INFO } from './types';

export const receiveErrors =  message  => {
  return {
    type: RECEIVE_ERRORS,
    payload: message
  }
}

export const clearErrors =  message  => {
  return {
    type: CLEAR_ERRORS
  }
}

export const receiveCurrentUser = user => {
  return {
    type: RECEIVE_CURRENT_USER,
    payload: user
  }
}

export const logoutCurrentUser = user => {
  return {
    type: LOGOUT_CURRENT_USER
  }
}

export const purchaseStock = stock => {
  return {
    type: PURCHASE_STOCK,
    payload: stock
  }
}

export const changeUserStockInfo = userStockInfo => {
  return {
    type: PURCHASE_STOCK,
    payload: userStockInfo
  }
}