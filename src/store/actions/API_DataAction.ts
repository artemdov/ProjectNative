import actionTypes from '../actionTypes';
import {Dispatch} from 'redux';
import {API} from '../../api/api';

export const setAPIData = (data: []) =>
  ({
    type: actionTypes.artWorkData.SET_API_DATA,
    payload: data,
  } as const);

export const upLoadingAPIData = (uploadingAPIData: boolean) =>
  ({
    type: actionTypes.artWorkData.SET_UPLOADING_API_DATA,
    payload: uploadingAPIData,
  } as const);

export const changeValue = (value: string) =>
  ({
    type: actionTypes.artWorkData.SEARCH_VALUE_QUERY,
    payload: value,
  } as const);

export const getAPIData = () => async (dispatch: Dispatch) => {
  try {
    let response = await API.getData();
    dispatch(setAPIData(response.data.data));
      console.log('response1', response.data.data)
  } catch (er) {
    console.log(er);
  }
};
export const getQueryData = (value: string) => async (dispatch: Dispatch) => {
  try {
    let response = await API.getQueryData(value);
    dispatch(changeValue(value));
    dispatch(setAPIData(response.data.data));
      console.log('response2', response.data.data)
    dispatch(changeValue(''));
  } catch (er) {
    console.log(er);
  }
};
