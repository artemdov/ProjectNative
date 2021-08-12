import actionTypes from '../actionTypes';
import {Dispatch} from 'redux';
import {API} from '../../api/api';

export const setAPIData = (data: any) =>
  ({
    type: actionTypes.data.SET_API_DATA,
    payload: data,
  } as const);

export const upLoadingAPIData = (uploadingAPIData: boolean) =>
  ({
    type: actionTypes.data.SET_UPLOADING_API_DATA,
    payload: uploadingAPIData,
  } as const);

export const getAPIData = () => async (dispatch: Dispatch) => {
  let response = await API.getData();
  dispatch(setAPIData(response.data));
};
