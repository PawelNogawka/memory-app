import * as api from "../api";
import * as actionTypes from "./actionsTypes";

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_POSTS_REQUEST });
    const { data } = await api.fetchPosts();
    dispatch({
      type: actionTypes.GET_POSTS_SUCCESS,
      payload: data.postMessages,
    });
  } catch (error) {
    if (error.response.data.details) {
      console.log(error.response.data.details);
    } else {
      console.log(error.response.data.message);
    }

    dispatch({
      type: actionTypes.GET_POSTS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_POST_REQUEST });
    const { data } = await api.fetchPost(id);

    dispatch({ type: actionTypes.GET_POST_SUCCESS, payload: data });
  } catch (error) {
    if (error.response.data.details) {
      console.log(error.response.data.details);
    } else {
      console.log(error.response.data.message);
    }

    dispatch({
      type: actionTypes.GET_POST_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getPostsBySearch = (searchQuery, tags) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_POSTS_BY_SEARCH_REQUEST,
    });
    const { data } = await api.fetchPostsBySearch(searchQuery, tags);
    dispatch({
      type: actionTypes.GET_POSTS_BY_SEARCH_SUCCESS,
      payload: data.posts,
    });
  } catch (error) {
    if (error.response.data.details) {
      console.log(error.response.data.details);
    } else {
      console.log(error.response.data.message);
    }

    dispatch({
      type: actionTypes.GET_POSTS_BY_SEARCH_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_USER_POSTS_REQUEST,
    });
    const { data } = await api.fetchUserPosts(id);
    dispatch({
      type: actionTypes.GET_USER_POSTS_SUCCESS,
      payload: data.userPosts,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: actionTypes.GET_USER_POSTS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const commentPost = (comment, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.COMMENT_POST_REQUEST });
    const { data } = await api.commentPost(comment, id);
    dispatch({ type: actionTypes.COMMENT_POST_SUCCESS, payload: data });
  } catch (error) {
    if (error.response.status === 400) {
      console.log(error.response.data.errors);
    } else {
      console.log(error.response.data.message);
    }
    dispatch({
      type: actionTypes.COMMENT_POST_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_POST_REQUEST });
    const { data } = await api.createPost(post);
    dispatch({ type: actionTypes.CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    if (error.response.status === 400) {
      console.log(error.response.data.errors);
    }
    dispatch({
      type: actionTypes.CREATE_POST_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: actionTypes.LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_POST_REQUEST, payload: id });
    const { data } = await api.updatePost(id, post);

    dispatch({ type: actionTypes.UPDATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_POST_FAILURE,
      payload: error.response.data.message,
    });
    console.log(error.response.data.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletePost(id);

    dispatch({ type: actionTypes.DELETE_POST, payload: data.post });
  } catch (error) {
    console.log(error.response.data.message);
  }
};
