import actionTypes from '../actionTypes';
import {uploadImage} from "../../utils/helpers";
import firebase from "firebase";
import {setOtherUserInfo} from "./otherProfileUserAction";
import {Dispatch} from "redux";

export const setUserInfo = (userInfo: any) =>
  ({
    type: actionTypes.profileUser.SET_USER_INFO,
    payload: userInfo,
  } as const);

export const upLoadingUserImage = (uploading: boolean) =>
  ({
    type: actionTypes.profileUser.SET_UPLOADING_USER_IMAGE,
    payload: uploading,
  } as const);

export const setTransferredUserImage = (transferred: number) =>
  ({
    type: actionTypes.profileUser.SET_TRANSFERRED_IMAGE,
    payload: transferred,
  } as const);

export const setUserImage = (image?: string) =>
  ({
    type: actionTypes.profileUser.SET_USER_IMAGE,
    payload: image,
  } as const);

export const setUserPosts = (posts: any) =>
  ({
    type: actionTypes.profileUser.SET_USER_POSTS,
    payload: posts,
  } as const);

export const setIsLoadingUserPost = (isLoadingPost: boolean) =>
  ({
    type: actionTypes.profileUser.SET_IS_LOADING_USER_POST,
    payload: isLoadingPost,
  } as const);
/*
export const editProfile = () = (dispatch: Dispatch) => {
    let imgUrl = await uploadImage(userImage);
    dispatch(setUserImage(''));
    if (imgUrl == null && userInfo.userImage) {
        imgUrl = userInfo.userImage;
    }
    await firebase.database().ref(`users/${user.uid}`).update({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        country: country,
        userImage: imgUrl,
    });
    await firebase
        .database()
        .ref(`users/${user.uid}`)
        .get()
        .then(snapshot => {
            if (snapshot.exists()) {
                dispatch(setUserInfo(snapshot.val()));
                dispatch(setOtherUserInfo(snapshot.val()));
            }
        })
}*/

