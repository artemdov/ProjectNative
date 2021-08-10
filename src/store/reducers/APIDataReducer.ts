import actionTypes from '../actionTypes';

const initialState = {
  data: [],
};
type initialStateType = typeof initialState;

export const APIDataReducer = (
  state = initialState,
  action: any,
): initialStateType => {
  switch (action.type) {
    case actionTypes.data.SET_API_DATA:
      return {...state, data: action.payload};
    default:
      return state;
  }
};
