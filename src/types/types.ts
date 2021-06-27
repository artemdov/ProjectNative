import {StackNavigationProp} from '@react-navigation/stack';
import {GestureResponderEvent} from 'react-native';

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

export type AppInputType = {
  onChangeText: (text: string) => void;
  onBlur: (e: FocusEvent) => void;
  value: string;
  label: string;
  error: boolean | undefined;
  errorMessage?: string | undefined;
  secureTextEntry?: boolean;
};
export type AppButtonType = {
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
