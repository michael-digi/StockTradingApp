import { SWITCH_LOADING } from "../actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case SWITCH_LOADING:
      return action.payload;
    default:
      return state;
  }
};