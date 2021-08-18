import actionTypes from '../actionTypes';
import {Dispatch} from 'redux';
import {API} from '../../api/api';

export const setArtworkData = (data: []) =>
  ({
    type: actionTypes.artworkData.SET_ARTWORK_DATA,
    payload: data,
  } as const);

export const upLoadingArtworkData = (uploadingArtworkData: boolean) =>
  ({
    type: actionTypes.artworkData.SET_UPLOADING_ARTWORK_DATA,
    payload: uploadingArtworkData,
  } as const);

export const getArtworkData = () => async (dispatch: Dispatch) => {
  try {
    let response = await API.getArtworkData();
    dispatch(setArtworkData(response.data.data));
  }
  catch (er) {
    console.log(er);
  }
};
export const getArtworkValueData =
  (value: string) => async (dispatch: Dispatch) => {
    try {
      let response = await API.getArtworkSearchData(value);
      dispatch(setArtworkData(response.data.data));
    }
    catch (er) {
      console.log(er);
    }
  };
