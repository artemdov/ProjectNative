import actionTypes from '../actionTypes';

export const setIsLoggedIn = (value: boolean) =>
  ({
    type: actionTypes.auth.LOGIN,
    value,
  } as const);
