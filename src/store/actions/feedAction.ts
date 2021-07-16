import actionTypes from '../actionTypes';

export const changeValuePost = (valuePost: string) =>
  ({
    type: actionTypes.feed.CHANGE_VALUE_POST,
    payload: valuePost,
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
export const setTransferred = (transferred: number) =>
    ({
        type: actionTypes.feed.SET_TRANSFERRED,
        payload: transferred,
    } as const);

