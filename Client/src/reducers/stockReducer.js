import { PURCHASE_STOCK } from '../actions/types'

const _STOCK = { ticker: '', price: 0, shares: 0 }

export default (state = _STOCK, action) => {
  console.log(action.payload)
  switch (action.type) {
    case PURCHASE_STOCK:
      return action.payload;
    default:
      return state;
  }
};