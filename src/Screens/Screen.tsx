import React from 'react';
import {MainScreen} from "./MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {SecondScreen} from "./SecondScreen";


const Stack = createStackNavigator()

export const Screen = () => {

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
                    options={{
                        header: () =>null
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default Screen