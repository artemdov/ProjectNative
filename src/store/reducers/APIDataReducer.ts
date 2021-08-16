import actionTypes from '../actionTypes';

const initialState = {
  data: [],
  value: '',
  uploadingAPIData: false,
};
type initialStateType = typeof initialState;

export const APIDataReducer = (
  state = initialState,
  action: any,
): initialStateType => {
  switch (action.type) {
    case actionTypes.data.SET_API_DATA:
      return {...state, data: action.payload};
    case actionTypes.data.SET_UPLOADING_API_DATA:
      return {...state, uploadingAPIData: action.payload};
    case actionTypes.data.SEARCH_VALUE_QUERY:
      return {...state, value: action.payload};
    default:
      return state;
  }
};
