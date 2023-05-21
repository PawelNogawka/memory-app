import * as api from "../api";
import * as actionTypes from "./actionsTypes";

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const login = (user, navigate) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.AUTH_REQUEST });
    const { data } = await api.login(user);
    dispatch({ type: actionTypes.AUTH_SUCCESS, payload: data });

    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: actionTypes.AUTH_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const register = (user, navigate) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.AUTH_REQUEST });
    const { data } = await api.register(user);
    dispatch({
      type: actionTypes.AUTH_SUCCESS,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  } catch (error) {
    console.log(error?.response?.data?.message);
    dispatch({
      type: actionTypes.AUTH_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: actionTypes.LOGOUT,
  });
};

export const checkAuthState = () => async (dispatch) => {
  const user = getUserFromLocalStorage();
  if (user) {
    dispatch({ type: actionTypes.AUTH_SUCCESS, payload: user });
  } else {
    dispatch({ type: actionTypes.AUTH_FAILURE });
  }
};
