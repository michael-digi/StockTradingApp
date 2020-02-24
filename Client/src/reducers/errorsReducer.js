import { RECEIVE_CURRENT_USER } from "../actions/types";
import { CLEAR_ERRORS, RECEIVE_ERRORS } from "../actions/types";

export default (state = "", { message, type }) => {
  switch (type) {
    case RECEIVE_ERRORS:
      return message;
    case CLEAR_ERRORS:
      return "";
    default:
      return state;
  }
};