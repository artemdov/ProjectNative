import actionTypes from '../actionTypes';

export const setUserInfo = (userInfo: any) =>
    ({
        type: actionTypes.editUser.SET_USER_INFO,
        payload: userInfo,
    } as const);

export const setOtherUserInfo = (otherUserInfo: any) =>
    ({
        type: actionTypes.editUser.SET_OTHER_USER_INFO,
        payload: otherUserInfo,
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
export const setOtherUserPosts = (posts: any) =>
    ({
        type: actionTypes.editUser.SET_OTHER_USER_POSTS,
        payload: posts,
    } as const);

export const setIsLoadingUserPost = (isLoadingPost: boolean) =>
    ({
        type: actionTypes.editUser.SET_IS_LOADING_USER_POST,
        payload: isLoadingPost,
    } as const);
