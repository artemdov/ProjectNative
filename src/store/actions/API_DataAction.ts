import actionTypes from '../actionTypes';

export const setAPIData = (data: any) =>
  ({
    type: actionTypes.data.SET_API_DATA,
    payload: data,
  } as const);
