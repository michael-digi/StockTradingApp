import { PURCHASE_STOCK } from '../actions/types'

const _STOCK = { ticker:null, 
                 companyName: null, 
                 open: 0, 
                 close: 0, 
                 latestPrice: 0,
                 previousClose: 0,
                 change: 0,
                 shares: 0,
                }

export default (state = _STOCK, action) => {
  switch (action.type) {
    case PURCHASE_STOCK:
      return action.payload;
    default:
      return state;
  }
};