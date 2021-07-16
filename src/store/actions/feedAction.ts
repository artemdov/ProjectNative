import actionTypes from '../actionTypes';

export const changeValue = (value: string) =>
  ({
    type: actionTypes.feed.CHANGE_VALUE,
    payload: value,
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

