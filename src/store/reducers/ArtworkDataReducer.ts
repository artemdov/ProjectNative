import actionTypes from '../actionTypes';
import {ActionType} from '../../types/types';

const initialState = {
  artworkData: [],
  uploadingArtworkData: false,
};
type initialStateType = typeof initialState;

export const ArtworkDataReducer = (
  state = initialState,
  action: ActionType,
) => {
  switch (action.type) {
    case actionTypes.artworkData.SET_ARTWORK_DATA:
      return <initialStateType>{...state, artworkData: action.payload};
    case actionTypes.artworkData.SET_UPLOADING_ARTWORK_DATA:
      return <initialStateType>{...state, uploadingArtworkData: action.payload};
    default:
      return state;
  }
};
