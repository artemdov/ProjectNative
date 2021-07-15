import actionTypes from '../actionTypes';

const initialState = {
  value: '',
  image: null,
};
type initialStateType = typeof initialState;

export const feedReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case actionTypes.feed.CHANGE_VALUE:
      return {...state, value: action.payload};
    case actionTypes.feed.SET_IMAGE:
      return {...state, image: action.payload};

    default:
      return state;
  }
};
