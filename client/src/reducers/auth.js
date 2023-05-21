import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_REQUEST:
      return { ...state, isLoading: true, error: null };

    case actionTypes.AUTH_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case actionTypes.AUTH_SUCCESS:
      return { user: action.payload, isLoading: false, error: null };

    case actionTypes.LOGOUT:
      return { user: null, isLoading: false, error: null };

    default:
      return state;
  }
};

export default auth;
