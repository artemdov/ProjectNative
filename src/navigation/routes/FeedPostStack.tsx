import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {FeedScreen} from '../../screens/Feed/FeedScreen';
import {AddPostScreen} from '../../screens/Feed/AddPostScreen';
import {addPostOptions, profileOptions, withoutHeader} from '../options';
import screenNames from '../ScreenNames';
import {ProfileScreen} from "../../screens/Profile/ProfileScreen";

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
      <Stack.Screen
          name={screenNames.PROFILE_SCREEN}
          component={ProfileScreen}
          // @ts-ignore
          options={profileOptions}
      />
  </Stack.Navigator>
);
