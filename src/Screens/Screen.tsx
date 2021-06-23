import React from 'react';
import {MainScreen} from "./MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {SecondScreen} from "./SecondScreen";
import {Image} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";



const Stack =createStackNavigator()

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
                        header: () =>null
                    }}


                />
                <Stack.Screen
                    name={'SecondScreen'}
                    component={SecondScreen}
                    options={myOptions}

                />
            </Stack.Navigator>
        </NavigationContainer>

    )

}

export default Screen
