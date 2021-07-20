import actionTypes from '../actionTypes';
import firebase from "firebase";
import {Dispatch} from "redux";


export const changeValuePost = (valuePost: string) =>
    ({
        type: actionTypes.feed.CHANGE_VALUE_POST,
        payload: valuePost,
    } as const);
export const keyValue = (key: string | null) =>
    ({
        type: actionTypes.feed.SET_KEY,
        payload: key,
    } as const);
export const setKey = () => (dispatch: Dispatch) => {
    const key = firebase.database().ref().push().key
    dispatch(keyValue(key))
}
export const isDeletedPost = (isDeleted: boolean) =>
    ({
        type: actionTypes.feed.IS_DELETED_POST,
        payload: isDeleted,
    } as const);

export const setPostData = (postData: []) =>
    ({
        type: actionTypes.feed.SET_POST_DATA,
        payload: postData,
    } as const);

export const setImage = (image: string | undefined) =>
  ({
    type: actionTypes.feed.SET_IMAGE,
    payload: image,
  } as const);
export const upLoadingForImage = (uploading: boolean) =>
    ({
        type: actionTypes.feed.UPLOAD,
        payload: uploading,
    } as const);
export const isLoadingPost = (isLoadingPost: boolean) =>
    ({
        type: actionTypes.feed.IS_LOAD_POST,
        payload: isLoadingPost,
    } as const);
export const setTransferred = (transferred: number) =>
    ({
        type: actionTypes.feed.SET_TRANSFERRED,
        payload: transferred,
    } as const);

