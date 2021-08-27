import {ActionType} from "../../types/types";
import actionTypes from "../actionTypes";

const initialState = {
    userInfo: null,
    otherUserInfo: null,
    userImage: '',
    upLoadingUserInfo: false,
    transferredImage: 0,
    userPosts: [],
    otherUserPosts: [],
    key: '',
};
type initialStateType = typeof initialState;

export const profileUserReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case actionTypes.editUser.SET_USER_INFO:
            return <initialStateType>{...state, userInfo: action.payload};
        case actionTypes.editUser.SET_OTHER_USER_INFO:
            return <initialStateType>{...state, otherUserInfo: action.payload};
        case actionTypes.editUser.SET_UPLOADING_USER_IMAGE:
            return <initialStateType>{...state, upLoadingUserInfo: action.payload};
        case actionTypes.editUser.SET_TRANSFERRED_IMAGE:
            return <initialStateType>{...state, transferredImage: action.payload};
        case actionTypes.editUser.SET_USER_IMAGE:
            return <initialStateType>{...state, userImage: action.payload};
        case actionTypes.editUser.SET_USER_POSTS:
            return <initialStateType>{...state, userPosts: action.payload};
        case actionTypes.editUser.SET_OTHER_USER_POSTS:
            return <initialStateType>{...state, otherUserPosts: action.payload};

        case actionTypes.editUser.SET_KEY:
            return <initialStateType>{...state, key: action.payload};
        default:
            return state;
    }
};
