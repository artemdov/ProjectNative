import React from 'react';
import {View, TouchableOpacity, Text, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {FeedScreen} from "../../screens/Feed/FeedScreen";
import {AddPostScreen} from "../../screens/Feed/AddPostScreen";
import {feedPostOptions, withoutHeader} from "../options";
import screenNames from "../ScreenNames";

const Stack = createStackNavigator();

export const FeedPostStack: React.FC<any> = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={screenNames.FEED_SCREEN}
            component={FeedScreen}
            options={withoutHeader()}
        />
        <Stack.Screen
            name={screenNames.ADD_POST_SCREEN}
            component={AddPostScreen}
            options={{
                title: 'Добавить пост',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#2e64e515',
                    shadowColor: '#2e64e515',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
            }}
        />
    </Stack.Navigator>
)

