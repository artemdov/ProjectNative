import {StackNavigationProp, StackScreenProps} from "@react-navigation/stack";

import {GestureResponderEvent} from "react-native";

export type myOptionsType = {
    title: string
    headerTintColor: string
    headerStyle: {
        backgroundColor: string
    }
}
export type StackParamListType = {
    MainScreen: undefined
    EnterScreen: myOptionsType
    RegistrationScreen: myOptionsType
}
type MainScreenProp = StackNavigationProp<StackParamListType, 'MainScreen'>
export type Props = {
    navigation: MainScreenProp
}

export  type AppInputType = {
    onChangeText: (text: string) => void
    value: string
    label: string
}
export type AppButtonType = {
    title: string
    onPress: (event: GestureResponderEvent) => void
    secureTextEntry?: boolean
}
