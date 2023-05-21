import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  posts: [],
  post: {},
  isLoading: false,
  isCommenting: false,
  error: null,
  postError: null,
  isPostLoading: false,
  commentError: null,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS_REQUEST:
    case actionTypes.GET_POSTS_BY_SEARCH_REQUEST:
    case actionTypes.GET_USER_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case actionTypes.GET_POST_REQUEST:
      return {
        ...state,
        isPostLoading: true,
        error: null,
      };

    case actionTypes.COMMENT_POST_REQUEST:
      return {
        ...state,
        commentError: null,
        isCommenting: true,
      };

    case actionTypes.CREATE_POST_REQUEST:
    case actionTypes.UPDATE_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        postError: null,
      };

    case actionTypes.GET_POSTS_SUCCESS:
    case actionTypes.GET_POSTS_BY_SEARCH_SUCCESS:
    case actionTypes.GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
        error: null,
      };

    case actionTypes.COMMENT_POST_SUCCESS:
      return {
        ...state,
        commentError: null,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        isCommenting: false,
      };

    case actionTypes.GET_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        isPostLoading: false,
        error: null,
      };

    case actionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        isLoading: false,
        postError: null,
      };

    case actionTypes.LIKE_POST_SUCCESS:
    case actionTypes.UPDATE_POST_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case actionTypes.GET_POSTS_FAILURE:
    case actionTypes.GET_POST_FAILURE:
    case actionTypes.GET_POSTS_BY_SEARCH_FAILURE:
    case actionTypes.GET_USER_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case actionTypes.GET_POST_FAILURE:
      return {
        ...state,
        isPostLoading: false,
        error: action.payload,
      };

    case actionTypes.COMMENT_POST_FAILURE:
      return {
        ...state,
        commentError: action.payload,
        isCommenting: false,
      };

    case actionTypes.CREATE_POST_FAILURE:
    case actionTypes.UPDATE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        postError: action.payload,
      };

    case actionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export default posts;
