import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_OUT_REQUEST,
  AUTH_SIGN_OUT_SUCCESS,
  SET_ERROR,
} from '../types';

const INITIAL_STATE = {
  data: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN_REQUEST:
    case AUTH_SIGN_OUT_REQUEST:
      return { ...state };
    case AUTH_SIGN_IN_SUCCESS:
      return { ...state, data: action.payload, error: null };
    case AUTH_SIGN_OUT_SUCCESS:
      return { ...state, data: null };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
