import React from 'react';
import {MainScreen} from "./MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {EnterScreen} from "./EnterScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {RegistrationScreen} from "./RegistrationScreen";
import {StackParamListType} from "../types/types";


const Stack = createStackNavigator<StackParamListType>()
export const myOptions = {
    title: 'Вход',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#0c0c30',
    }
}

export const Screen = () => {



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
