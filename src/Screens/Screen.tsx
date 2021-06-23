import React from 'react';
import {MainScreen} from "./MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {SecondScreen} from "./SecondScreen";
import {Image} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";



const Stack =createStackNavigator()

export const Screen = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{
                                     title: '',
                                     headerStyle: {height: 51},
                                     headerTransparent: true,
                                     headerBackImage: () => <Image style={{backgroundColor: 'white', width: 29, height: 71, marginLeft: 9}} source={require('../../assets/backArrow.png')} />
                                 }}>
                <Stack.Screen
                    name={'MainScreen'}
                    component={MainScreen}

                />
                <Stack.Screen
                    name={'SecondScreen'}
                    component={SecondScreen}

                />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default Screen
