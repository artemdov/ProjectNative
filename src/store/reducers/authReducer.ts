import {AuthActionType} from '../../types/types';
import actionTypes from '../actionTypes';

const initialState = {
  user: null,
  loading: false,
  error: '',
  authenticated: false,
  isLoggedIn: false,
};
type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: AuthActionType,): initialStateType => {
  switch (action.type) {
    case actionTypes.auth.SET_USER:
      return {...state, user: action.payload};
    case actionTypes.auth.SET_LOADING:
      return {...state, loading: action.payload};
    case actionTypes.auth.SET_ERROR:
      return {...state, error: action.payload};
    case actionTypes.auth.LOGIN:
      return {...state, isLoggedIn: action.payload};
    case actionTypes.auth.IS_AUTHENTICATED:
      return {...state, authenticated: action.payload};


    default:
      return state;
  }
};
export default authReducer;
