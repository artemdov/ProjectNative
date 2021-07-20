import actionTypes from '../actionTypes';

const initialState = {
  valuePost: '',
  image: '',
  key: '',
  isLoadingPost: true,
  upLoading: false,
  isDeleted: false,
  transferred: 0,
  postData: [],
};
type initialStateType = typeof initialState;

export const feedReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case actionTypes.feed.CHANGE_VALUE_POST:
      return {...state, valuePost: action.payload};
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
    case actionTypes.feed.SET_KEY:
      return {...state, key: action.payload};
    case actionTypes.feed.IS_DELETED_POST:
      return {...state, isDeleted: action.payload};

    default:
      return state;
  }
};
