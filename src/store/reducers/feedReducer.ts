import actionTypes from '../actionTypes';

const initialState = {
  image: '',
  isLoadingPost: false,
  upLoading: false,
  transferred: 0,
  postData: [],
  commentsData: [],
};
type initialStateType = typeof initialState;

export const feedReducer = (
  state = initialState,
  action: any,
): initialStateType => {
  switch (action.type) {
    case actionTypes.feed.SET_IMAGE:
      return {...state, image: action.payload};
    case actionTypes.feed.UPLOAD:
      return {...state, upLoading: action.payload};
    case actionTypes.feed.IS_LOAD_POST:
      return {...state, isLoadingPost: action.payload};
    case actionTypes.feed.SET_TRANSFERRED:
      return {...state, transferred: action.payload};
    case actionTypes.feed.SET_POST_DATA:
      return {...state, postData: action.payload};
    case actionTypes.feed.SET_COMMENTS_DATA:
      return {...state, commentsData: action.payload};
    default:
      return state;
  }
};
