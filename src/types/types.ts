import {StackNavigationProp} from '@react-navigation/stack';
import {GestureResponderEvent} from 'react-native';
import {rootReducer} from '../store/store';
import {
    errorMessage, isAuthenticated,
    loadingStatus,
    OnSubmitLogIn,
    OnSubmitRegistration,
    setIsLoggedIn, setUser
} from '../store/actions/authAction';

export type myOptionsType = {
    title: string;
    headerTintColor: string;
    headerStyle: {
        backgroundColor: string;
    };
};
export type StackParamListType = {
    LandingScreen: { name: string };
    EnterScreen: myOptionsType;
    RegistrationScreen: myOptionsType;
};
type LandingScreenProp = StackNavigationProp<StackParamListType,
    'LandingScreen'>;
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
export type OnSubmitRegistrationDataType = {
    email: string;
    password: string;
    confirmPassword: string;
};
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AuthActionType = ReturnType<typeof setIsLoggedIn> | ReturnType<typeof errorMessage> |
    ReturnType<typeof OnSubmitRegistration> | ReturnType<typeof OnSubmitLogIn>
    | ReturnType<typeof loadingStatus> | ReturnType<typeof setUser>
    | ReturnType<typeof isAuthenticated>;
