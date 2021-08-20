import actionTypes from '../actionTypes';
import {ActionType} from '../../types/types';

const initialState = {
  artworks: [],
  isLoadingArtworks: false,
};
type initialStateType = typeof initialState;

export const artworksReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case actionTypes.artworks.SET_ARTWORKS:
      return <initialStateType>{...state, artworks: action.payload};
    case actionTypes.artworks.SET_IS_LOADING_ARTWORKS:
      return <initialStateType>{...state, isLoadingArtworks: action.payload};
    default:
      return state;
  }
};
