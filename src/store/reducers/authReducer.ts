import {AuthActionType} from '../../types/types';
import actionTypes from '../actionTypes';

const initialState = {
  isLoggedIn: false,
};
type initialStateType = typeof initialState;

const authReducer = (
  state = initialState,
  action: AuthActionType,
): initialStateType => {
  switch (action.type) {
    case actionTypes.auth.LOGIN:
      return {...state, isLoggedIn: action.payload};

    case actionTypes.auth.LOGOUT:
      return {...state};

    default:
      return state;
  }
};
export default authReducer;
