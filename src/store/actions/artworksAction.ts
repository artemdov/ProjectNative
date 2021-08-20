import actionTypes from '../actionTypes';
import {Dispatch} from 'redux';
import {API} from '../../api/api';

export const setArtworks = (data: []) =>
  ({
    type: actionTypes.artworks.SET_ARTWORKS,
    payload: data,
  } as const);

export const isLoadingArtworks = (isLoading: boolean) =>
  ({
    type: actionTypes.artworks.SET_IS_LOADING_ARTWORKS,
    payload: isLoading,
  } as const);

export const getArtworks = () => async (dispatch: Dispatch) => {
  try {
    let response = await API.getArtworks();
    dispatch(setArtworks(response.data.data));
  }
  catch (er) {
    console.log(er);
  }
};
export const searchArtwork = (value: string) => async (dispatch: Dispatch) => {
  try {
    let response = await API.searchArtwork(value);
    dispatch(setArtworks(response.data.data));
  }
  catch (er) {
    console.log(er);
  }
};
