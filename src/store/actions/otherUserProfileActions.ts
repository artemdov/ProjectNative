import actionTypes from '../actionTypes';
import {PostType, UserInfoType} from '../../types/types';
import {Dispatch} from 'redux';
import firebase from 'firebase';
import {setIsLoadingUserPost} from './userProfileActions';

export const setOtherUserInfo = (otherUserInfo: UserInfoType | null) =>
  ({
    type: actionTypes.otherUserProfile.SET_OTHER_USER_INFO,
    payload: otherUserInfo,
  } as const);

export const setOtherUserPosts = (posts: PostType[]) =>
  ({
    type: actionTypes.otherUserProfile.SET_OTHER_USER_POSTS,
    payload: posts,
  } as const);

export const setOtherUserPostFromFirebase =
  (userUID: string | null): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoadingUserPost(true));
      const postsRef = firebase.database().ref('usersPost');
      const onLoadingFeed = postsRef.on('value', snapshot => {
        const listData: any[] = [];
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
              userId,
              userImage,
              postTime,
              post,
              postImg,
              likes,
            });
          }
        });
        dispatch(setOtherUserPosts(listData));
        dispatch(setIsLoadingUserPost(false));
      });
      return () => {
        postsRef.off('value', onLoadingFeed);
      };
    }
    catch (error) {
      console.log(error);
    }
  };

export const setOtherUserInfoFromFirebase =
  (userUID: string | null) => async (dispatch: Dispatch) => {
    try {
      firebase
        .database()
        .ref(`users/${userUID}`)
        .on('value', snapshot => {
          if (snapshot.exists()) {
            dispatch(setOtherUserInfo(snapshot.val()));
          }
        });
    }
    catch (error) {
      console.log(error);
    }
  };
