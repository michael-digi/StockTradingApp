import { LOAD_USER_STOCK_INFO } from '../actions/types'

const _USER_STOCK = { cash: 5000, 
                      transactions: [], 
                      stocks: {} }

export default (state = _USER_STOCK, action) => {
  switch (action.type) {
    case LOAD_USER_STOCK_INFO:
      return action.payload
    default:
      return state;
  }
};