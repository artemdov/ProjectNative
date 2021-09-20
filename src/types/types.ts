import {StackNavigationProp} from '@react-navigation/stack';
import {GestureResponderEvent} from 'react-native';
import {rootReducer} from '../store/store';
import {
  errorMessage,
  setLoadingStatus,
  setIsLoggedIn,
  setUser,
  setProfileSetup,
} from '../store/actions/authActions';
import {setArtworks, isLoadingArtworks} from '../store/actions/artworksActions';
import {
  setCommentMenuVisible,
  setComments,
  setImage,
  setIsLoadingPost,
  setPosts,
} from '../store/actions/feedActions';
import {
  setProgressLoadingUserImage,
  setUserImage,
  setUserInfo,
  upLoadingUserImage,
  setUserPosts,
  setIsLoadingUserPost,
} from '../store/actions/userProfileActions';
import {
  setOtherUserInfo,
  setOtherUserPosts,
} from '../store/actions/otherUserProfileActions';

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

export type CustomFormTextInputType = {
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
  firstName?: string;
  lastName?: string;
  userImage?: string;
  postTime: number;
  post?: string;
  postImg?: string;
  likes?: {
    isLike: boolean;
  };
};
export type UserInfoType = {
  country?: string;
  createdAt?: number;
  email?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userId: string;
  userImage?: string;
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
  | ReturnType<typeof setUser>
  | ReturnType<typeof setProfileSetup>;

type ArtworkActionType =
  | ReturnType<typeof setArtworks>
  | ReturnType<typeof isLoadingArtworks>;

type feedActionType =
  | ReturnType<typeof setPosts>
  | ReturnType<typeof setComments>
  | ReturnType<typeof setImage>
  | ReturnType<typeof setCommentMenuVisible>
  | ReturnType<typeof setIsLoadingPost>;

type ProfileUserType =
  | ReturnType<typeof setUserInfo>
  | ReturnType<typeof upLoadingUserImage>
  | ReturnType<typeof setProgressLoadingUserImage>
  | ReturnType<typeof setUserImage>
  | ReturnType<typeof setUserPosts>
  | ReturnType<typeof setIsLoadingUserPost>;

type OtherProfileUserType =
  | ReturnType<typeof setOtherUserPosts>
  | ReturnType<typeof setOtherUserInfo>;

export type ActionType =
  | ArtworkActionType
  | AuthActionType
  | feedActionType
  | ProfileUserType
  | OtherProfileUserType;
