import { LOAD_USER_STOCK_INFO } from '../actions/types'

const _USER_STOCK = { cash: '', 
                      transactions: [], 
                      stocks: [] }

export default (state = _USER_STOCK, action) => {
  switch (action.type) {
    case LOAD_USER_STOCK_INFO:
      return {...state, cash: action.payload.cash,
                        transactions: action.payload.transactions,
                        stocks: action.payload.stocks
      }
    default:
      return state;
  }
};