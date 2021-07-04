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

export const loadingStatus = (value: boolean) =>
  ({
    type: actionTypes.auth.SET_LOADING,
    payload: value,
  } as const);

export const onSubmitRegistration =
  (data: OnSubmitRegistrationDataType) => async (dispatch: Dispatch) => {
    try {
      dispatch(loadingStatus(true));
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      if (res.user) {
        dispatch(setIsLoggedIn(true));
        dispatch(loadingStatus(false));
      }
    } catch (err) {
      dispatch(errorMessage(err));
    }
  };
export const onSubmitLogIn =
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

export const onSubmitLogOut = () => async (dispatch: Dispatch) => {
  try {
    dispatch(loadingStatus(true));
    await firebase.auth().signOut();
    dispatch(setIsLoggedIn(false));
    dispatch(loadingStatus(false));
  } catch (err) {
    dispatch(errorMessage(err));
  }
};
