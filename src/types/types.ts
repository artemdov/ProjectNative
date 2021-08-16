import {StackNavigationProp} from '@react-navigation/stack';
import {GestureResponderEvent} from 'react-native';
import {rootReducer} from '../store/store';
import {
  errorMessage,
  setLoadingStatus,
  setIsLoggedIn,
  setUser,
} from '../store/actions/authAction';
import {
  changeValue,
  setAPIData,
  upLoadingAPIData,
} from '../store/actions/API_DataAction';
import {
  setCommentMenuVisible,
  setComments,
  setImage,
  setIsLoadingPost,
  setPosts,
  setTransferred,
  upLoadingImage,
} from '../store/actions/feedAction';

export type myOptionsType = {
  title: string;
  headerTintColor: string;
  headerStyle: {
    backgroundColor: string;
  };
};
export type StackParamListType = {
  LandingScreen: {name: string};
  EnterScreen: myOptionsType;
  RegistrationScreen: myOptionsType;
};
type LandingScreenProp = StackNavigationProp<
  StackParamListType,
  'LandingScreen'
>;
export type Props = {
  navigation: LandingScreenProp;
};

export type CustomTextInputType = {
  onChangePassword: (text: string) => void;
  onBlur?: (e: FocusEvent) => void;
  value: string;
  label: string;
  error?: boolean;
  errorMessage?: string;
  secureTextEntry?: boolean;
};
export type CustomButtonType = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};
export type OnSubmitLoginType = {
  email: string;
  password: string;
};
export type PostType = {
  id: string;
  userId: string;
  userName?: string;
  userImage?: string;
  postTime: number;
  post?: string;
  postImg?: string;
  likes?: {
    isLike: boolean;
  };
};
export type CommentType = {
  comment?: string;
  createdAt: number;
  postId: string;
  userId: string;
  userName?: string;
  userImage: string;
};
export type OnSubmitRegistrationDataType = {
  email: string;
  password: string;
  confirmPassword: string;
};
export type AppRootStateType = ReturnType<typeof rootReducer>;

type AuthActionType =
  | ReturnType<typeof setIsLoggedIn>
  | ReturnType<typeof errorMessage>
  | ReturnType<typeof setLoadingStatus>
  | ReturnType<typeof setUser>;

type ArtWorkAPIActionType =
  | ReturnType<typeof setAPIData>
  | ReturnType<typeof upLoadingAPIData>
  | ReturnType<typeof changeValue>;

type feedActionType =
  | ReturnType<typeof setPosts>
  | ReturnType<typeof setComments>
  | ReturnType<typeof setImage>
  | ReturnType<typeof setCommentMenuVisible>
  | ReturnType<typeof upLoadingImage>
  | ReturnType<typeof setIsLoadingPost>
  | ReturnType<typeof setTransferred>;

export type ActionsType =
  | ArtWorkAPIActionType
  | AuthActionType
  | feedActionType;
