import actionTypes from '../actionTypes';
import {
  OnSubmitLoginType,
  OnSubmitRegistrationDataType,
} from '../../types/types';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Dispatch} from 'redux';
import firebase from 'firebase';
import {userImagePlaceholder} from '../../consts/userImagePlaceholder';
import {setUserInfo, setUserPosts} from './userProfileActions';

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

export const setProfileSetup = (profileSetupFinished: boolean) =>
  ({
    type: actionTypes.auth.SET_PROFILE_SETUP_FINISHED,
    payload: profileSetupFinished,
  } as const);

export const setUserPostFromFirebase =
  (userUID: string | null): any =>
  async (dispatch: Dispatch) => {
    try {
      await firebase
        .database()
        .ref('usersPost')
        .on('value', snapshot => {
          const listData: any = [];
          snapshot.forEach(childSnapshot => {
            const currentUserId = childSnapshot.val().userId;
            if (currentUserId === userUID) {
              const {
                id,
                firstName,
                lastName,
                userId,
                post,
                postImg,
                postTime,
                likes,
                userImage,
              } = childSnapshot.val();
              listData.push({
                id,
                firstName,
                lastName,
                userImage,
                userId,
                postTime,
                post,
                postImg,
                likes,
              });
            }
          });
          dispatch(setUserPosts(listData));
        });
    }
    catch (error) {
      console.log(error);
    }
  };

export const onSubmitRegistration =
  (data: OnSubmitRegistrationDataType) => async (dispatch: Dispatch) => {
    try {
      dispatch(setUserPosts([]));
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
        userImage: userImagePlaceholder,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
      dispatch(setProfileSetup(false));
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
      const res = await auth().signInWithEmailAndPassword(
        data.email,
        data.password,
      );
      await firebase
        .database()
        .ref(`users/${res.user.uid}`)
        .on('value', snapshot => {
          if (snapshot.exists()) {
            dispatch(setUserInfo(snapshot.val()));
          }
        });
      dispatch(setUserPostFromFirebase(res.user.uid));
      dispatch(setIsLoggedIn(true));
      dispatch(setLoadingStatus(false));
    }
    catch (err) {
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
