import actionTypes from '../actionTypes';

const initialState = {
  valuePost: '',
  image: '',
  upLoading: false,
  transferred: 0,
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
    case actionTypes.feed.SET_TRANSFERRED:
      return {...state, transferred: action.payload};

    default:
      return state;
  }
};
