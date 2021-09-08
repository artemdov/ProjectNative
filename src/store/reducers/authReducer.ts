import actionTypes from '../actionTypes';
import {ActionType} from '../../types/types';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

const initialState = {
  user: null as FirebaseAuthTypes.User | null,
  loading: true,
  error: '',
  isLoggedIn: false,
  profileSetupFinished: true,
};
type initialStateType = typeof initialState;

export const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case actionTypes.auth.SET_USER:
      return <initialStateType>{...state, user: action.payload};
    case actionTypes.auth.SET_LOADING:
      return <initialStateType>{...state, loading: action.payload};
    case actionTypes.auth.SET_ERROR:
      return <initialStateType>{...state, error: action.payload};
    case actionTypes.auth.LOGIN:
      return <initialStateType>{...state, isLoggedIn: action.payload};
    case actionTypes.auth.SETUP_PROFILE:
      return <initialStateType>{...state, profileSetupFinished: action.payload};
    default:
      return state;
  }
};
