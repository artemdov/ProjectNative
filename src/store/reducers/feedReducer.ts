import actionTypes from '../actionTypes';

const initialState = {
  image: '',
  isLoadingPost: false,
  upLoading: false,
  isCommentsMenuVisible: false,
  transferred: 0,
  posts: [],
  comments: [],
};
type initialStateType = typeof initialState;

export const feedReducer = (
  state = initialState,
  action: any,
): initialStateType => {
  switch (action.type) {
    case actionTypes.feed.SET_IMAGE:
      return {...state, image: action.payload};
    case actionTypes.feed.SET_UPLOADING:
      return {...state, upLoading: action.payload};
    case actionTypes.feed.SET_IS_LOADING_POST:
      return {...state, isLoadingPost: action.payload};
    case actionTypes.feed.SET_IS_COMMENT_MENU_VISIBLE:
      return {...state, isCommentsMenuVisible: action.payload};
    case actionTypes.feed.SET_TRANSFERRED:
      return {...state, transferred: action.payload};
    case actionTypes.feed.SET_POSTS:
      return {...state, posts: action.payload};
    case actionTypes.feed.SET_COMMENTS:
      return {...state, comments: action.payload};
    default:
      return state;
  }
};
