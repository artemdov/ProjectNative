import actionTypes from '../actionTypes';
import {ActionsType} from '../../types/types';

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
  action: ActionsType,
): initialStateType => {
  switch (action.type) {
    case actionTypes.feed.SET_IMAGE:
      return <initialStateType>{...state, image: action.payload};
    case actionTypes.feed.SET_UPLOADING:
      return <initialStateType>{...state, upLoading: action.payload};
    case actionTypes.feed.SET_IS_LOADING_POST:
      return <initialStateType>{...state, isLoadingPost: action.payload};
    case actionTypes.feed.SET_IS_COMMENT_MENU_VISIBLE:
      return <initialStateType>{
        ...state,
        isCommentsMenuVisible: action.payload,
      };
    case actionTypes.feed.SET_TRANSFERRED:
      return <initialStateType>{...state, transferred: action.payload};
    case actionTypes.feed.SET_POSTS:
      return <initialStateType>{...state, posts: action.payload};
    case actionTypes.feed.SET_COMMENTS:
      return <initialStateType>{...state, comments: action.payload};
    default:
      return state;
  }
};
