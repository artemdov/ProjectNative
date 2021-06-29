import {StackNavigationProp} from '@react-navigation/stack';
import {GestureResponderEvent} from 'react-native';
import {rootReducer} from '../store/store';
import {setIsLoggedIn} from "../store/actions/authAction";

export type myOptionsType = {
  title: string;
  headerTintColor: string;
  headerStyle: {
    backgroundColor: string;
  };
};
export type StackParamListType = {
  MainScreen: {name: string};
  EnterScreen: myOptionsType;
  RegistrationScreen: myOptionsType;
};
type MainScreenProp = StackNavigationProp<StackParamListType, 'MainScreen'>;
export type Props = {
  navigation: MainScreenProp;
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
export type OnSubmitRegistrationType = {
  email: string;
  password: string;
  confirmPassword: string;
};
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AuthActionType = ReturnType<typeof setIsLoggedIn>;
