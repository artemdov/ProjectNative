import actionTypes from '../actionTypes';
import {PossibleArray} from "react-native-image-crop-picker";

export const changeValue = (value: string) =>
  ({
    type: actionTypes.feed.CHANGE_VALUE,
    payload: value,
  } as const);

export const setImage = (image: string) =>
  ({
    type: actionTypes.feed.SET_IMAGE,
    payload: image,
  } as const);

