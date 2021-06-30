import actionTypes from '../actionTypes';

export const setIsLoggedIn = (value: boolean) =>
  ({
    type: actionTypes.auth.LOGIN,
    payload: value,
  } as const);
