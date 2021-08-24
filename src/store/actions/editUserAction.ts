import actionTypes from '../actionTypes';
import {CommentType, PostType} from '../../types/types';


export const setUserInfo = (userInfo: any) =>
    ({
        type: actionTypes.editUser.SET_USER_INFO,
        payload: userInfo,
    } as const);

export const upLoadingUserImage = (uploading: boolean) =>
    ({
        type: actionTypes.editUser.SET_UPLOADING_USER_IMAGE,
        payload: uploading,
    } as const);

export const setTransferredUserImage = (transferred: number) =>
    ({
        type: actionTypes.editUser.SET_TRANSFERRED_IMAGE,
        payload: transferred,
    } as const);

export const setUserImage = (image?: string) =>
    ({
        type: actionTypes.editUser.SET_USER_IMAGE,
        payload: image,
    } as const);
export const setUserPosts = (posts: any) =>
    ({
        type: actionTypes.editUser.SET_USER_POSTS,
        payload: posts,
    } as const);
