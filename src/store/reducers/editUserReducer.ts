import {ActionType} from "../../types/types";
import actionTypes from "../actionTypes";

const initialState = {
    userInfo: null,
    userImage: '',
    upLoadingUserInfo: false,
    transferredImage: 0,
};
type initialStateType = typeof initialState;

export const editUserReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case actionTypes.editUser.SET_USER_INFO:
            return <initialStateType>{...state, userInfo: action.payload};
        case actionTypes.editUser.SET_UPLOADING_USER_IMAGE:
            return <initialStateType>{...state, upLoadingUserInfo: action.payload};
        case actionTypes.editUser.SET_TRANSFERRED_IMAGE:
            return <initialStateType>{...state, transferredImage: action.payload};
        case actionTypes.editUser.SET_USER_IMAGE:
            return <initialStateType>{...state, userImage: action.payload};
        default:
            return state;
    }
};
