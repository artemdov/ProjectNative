import React from 'react';
import {MainScreen} from "./MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {EnterScreen} from "./EnterScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {RegistrationScreen} from "./RegistrationScreen";

type myOptionsType = {
    title: string,
    headerTintColor: string,
    headerStyle: {
        backgroundColor: string
    }
}
type MainScreenType = {
    header: () => void
}
export type StackParamListType = {
    MainScreen: MainScreenType
    EnterScreen: myOptionsType,
    RegistrationScreen: myOptionsType
}



const Stack = createStackNavigator<StackParamListType>()

export const Screen = () => {

    const myOptions = {
        title: 'Вход',
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#0c0c30',
        }
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={'MainScreen'}
                    component={MainScreen}
                    options={{
                        header: () => null
                    }}


                />
                <Stack.Screen
                    name={'EnterScreen'}
                    component={EnterScreen}
                    options={myOptions}

                />
                <Stack.Screen
                    name={'RegistrationScreen'}
                    component={RegistrationScreen}
                    options={{...myOptions, title: 'Регистрация'}}

                />
            </Stack.Navigator>
        </NavigationContainer>

    )

}

export default Screen
