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
  value: string;
  label: string;
  secureTextEntry?: boolean;
};
export type AppButtonType = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};
