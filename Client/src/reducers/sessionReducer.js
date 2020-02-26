import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/types'

const _NULL_SESSION = { userId: null, 
                        firstName: null}

export default (state = _NULL_SESSION, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.payload;
    case LOGOUT_CURRENT_USER:
      return _NULL_SESSION;
    default:
      return state;
  }
};