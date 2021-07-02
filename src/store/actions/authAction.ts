import actionTypes from '../actionTypes';
import {
  OnSubmitLoginType,
  OnSubmitRegistrationDataType,
} from '../../types/types';
import {firebase} from '@react-native-firebase/auth';
import {Dispatch} from 'redux';

export const setIsLoggedIn = (value: boolean) =>
  ({
    type: actionTypes.auth.LOGIN,
    payload: value,
  } as const);

export const setUser = (user: any) =>
  ({
    type: actionTypes.auth.SET_USER,
    payload: user,
  } as const);

export const errorMessage = (err: string) =>
  ({
    type: actionTypes.auth.SET_ERROR,
    payload: err,
  } as const);

export const isAuthenticated = (authenticated: boolean) =>
  ({
    type: actionTypes.auth.IS_AUTHENTICATED,
    payload: authenticated,
  } as const);

export const loadingStatus = (value: boolean) =>
  ({
    type: actionTypes.auth.SET_LOADING,
    payload: value,
  } as const);

export const OnSubmitRegistration: any =
  (data: OnSubmitRegistrationDataType) => async (dispatch: Dispatch) => {
    try {
      if (data.password === data.confirmPassword) {
        dispatch(loadingStatus(true));
        const res = await firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password);
        if (res.user) {
          dispatch(setIsLoggedIn(true));
          dispatch(loadingStatus(false));
        }
      }
    } catch (err) {
      dispatch(errorMessage(err));
    }
  };
export const OnSubmitLogIn =
  (data: OnSubmitLoginType) => async (dispatch: Dispatch) => {
    try {
      dispatch(loadingStatus(true));
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      dispatch(setIsLoggedIn(true));
      dispatch(loadingStatus(false));
    } catch (err) {
      dispatch(errorMessage(err));
    }
  };

export const OnSubmitLogOut = () => async (dispatch: Dispatch) => {
  try {
    dispatch(loadingStatus(true));
    await firebase.auth().signOut();
    dispatch(setIsLoggedIn(false));
    dispatch(loadingStatus(false));
  } catch (err) {
    dispatch(errorMessage(err));
  }
};
