import {AuthActionType} from '../../types/types';
import actionReducerTypes from '../actionTypes';

const initialState = {
  isLoggedIn: false,
};
type initialStateType = typeof initialState;

const authReducer = (
  state = initialState,
  action: AuthActionType,
): initialStateType => {
  switch (action.type) {
    case actionReducerTypes.auth.LOGIN:
      return {...state, isLoggedIn: action.value};

    case actionReducerTypes.auth.LOGOUT:
      return {...state};

    default:
      return state;
  }
};
export default authReducer;
