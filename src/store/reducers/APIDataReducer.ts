import actionTypes from '../actionTypes';

const initialState = {
  artWorkData: [],
  value: '',
  uploadingAPIData: false,
};
type initialStateType = typeof initialState;

export const APIDataReducer = (
  state = initialState,
  action: any,
): initialStateType => {
  switch (action.type) {
    case actionTypes.artWorkData.SET_API_DATA:
      return {...state, artWorkData: action.payload};
    case actionTypes.artWorkData.SET_UPLOADING_API_DATA:
      return {...state, uploadingAPIData: action.payload};
    case actionTypes.artWorkData.SEARCH_VALUE_QUERY:
      return {...state, value: action.payload};
    default:
      return state;
  }
};
