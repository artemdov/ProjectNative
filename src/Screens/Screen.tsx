import React from 'react';
import {MainScreen} from "./MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {SecondScreen} from "./SecondScreen";
import {createStackNavigator} from "react-navigation-stack";
import {Image} from "react-native";


const Stack = createStackNavigator()

export const Screen = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{
                                     title: '',
                                     headerStyle: {height: 51},
                                     headerTransparent: true,
                                     headerBackImage: () => <Image style={{width: 14, height: 11, marginLeft: 9}} source={require('../../assets/backArrow.png')} />
                                 }}>>
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
