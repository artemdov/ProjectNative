import actionTypes from '../actionTypes';

export const changeValue = (value: (e: string) => void) =>
  ({
    type: actionTypes.feed.CHANGE_VALUE,
    payload: value,
  } as const);

export const setImage = (image: any) =>
  ({
    type: actionTypes.auth.SET_USER,
    payload: image,
  } as const);

