import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {FeedScreen} from '../../screens/Feed/FeedScreen';
import {AddPostScreen} from '../../screens/Feed/AddPostScreen';
import {addPostOptions, withoutHeader} from '../options';
import screenNames from '../ScreenNames';

const Stack = createStackNavigator<any>();

export const FeedPostStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={screenNames.FEED_SCREEN}
      component={FeedScreen}
      options={withoutHeader()}
    />
    <Stack.Screen
      name={screenNames.ADD_POST_SCREEN}
      component={AddPostScreen}
      // @ts-ignore
      options={addPostOptions}
    />
  </Stack.Navigator>
);
