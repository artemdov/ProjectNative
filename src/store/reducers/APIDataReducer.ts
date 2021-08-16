import actionTypes from '../actionTypes';
import {ActionsType, ArtWorkAPIActionType} from '../../types/types';

const initialState = {
  artWorkData: [],
  value: '',
  uploadingAPIData: false,
};
type initialStateType = typeof initialState;

export const APIDataReducer = (
  state = initialState,
  action: ArtWorkAPIType,
): initialStateType => {
  switch (action.type) {
    case actionTypes.artWorkData.SET_API_DATA:
      return <initialStateType>{...state, artWorkData: action.payload};
    case actionTypes.artWorkData.SET_UPLOADING_API_DATA:
      return <initialStateType>{...state, uploadingAPIData: action.payload};
    case actionTypes.artWorkData.SEARCH_VALUE_QUERY:
      return <initialStateType>{...state, value: action.payload};
    default:
      return state;
  }
};
