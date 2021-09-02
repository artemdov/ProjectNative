import actionTypes from '../actionTypes';
import {
  OnSubmitLoginType,
  OnSubmitRegistrationDataType,
} from '../../types/types';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Dispatch} from 'redux';
import firebase from 'firebase';
import {photoUserProfile} from '../../utils/helpers';

export const setIsLoggedIn = (value: boolean) =>
  ({
    type: actionTypes.auth.LOGIN,
    payload: value,
  } as const);

export const setUser = (user: FirebaseAuthTypes.UpdateProfile | null) =>
  ({
    type: actionTypes.auth.SET_USER,
    payload: user,
  } as const);

export const errorMessage = (err: string) =>
  ({
    type: actionTypes.auth.SET_ERROR,
    payload: err,
  } as const);

export const setLoadingStatus = (value: boolean) =>
  ({
    type: actionTypes.auth.SET_LOADING,
    payload: value,
  } as const);

export const setInfo = (value: boolean) =>
    ({
        type: actionTypes.auth.INFO,
        payload: value,
    } as const);

export const onSubmitRegistration =
  (data: OnSubmitRegistrationDataType) => async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStatus(true));
      const res = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      if (res.user) {
        dispatch(setIsLoggedIn(true));
        dispatch(setLoadingStatus(false));
      }
      await firebase.database().ref(`users/${res.user.uid}`).update({
        email: data.email,
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        userId: res.user.uid,
        userImage: photoUserProfile,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
        dispatch(setInfo(false))
    }
    catch (err) {
      dispatch(errorMessage(err));
      dispatch(setLoadingStatus(false));
    }
  };
export const onSubmitLogIn =
  (data: OnSubmitLoginType) => async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStatus(true));
      await auth().signInWithEmailAndPassword(data.email, data.password);
      dispatch(setIsLoggedIn(true));
      dispatch(setLoadingStatus(false));
      dispatch(setInfo(true))

    } catch (err) {
      dispatch(errorMessage(err));
      dispatch(setLoadingStatus(false));
    }
  };

export const onSubmitLogOut = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoadingStatus(true));
    await auth().signOut();
    dispatch(setIsLoggedIn(false));
    dispatch(setLoadingStatus(false));
  }
  catch (err) {
    dispatch(errorMessage(err));
    dispatch(setLoadingStatus(false));
  }
};
