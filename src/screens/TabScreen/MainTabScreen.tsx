import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileScreen} from '../Profile/ProfileScreen';
import {FeedScreen} from '../Feed/FeedScreen';
import screenNames from '../../navigation/ScreenNames';
import {bottomOptions} from "../../navigation/options";

const Tab = createBottomTabNavigator<any>();

export const MainTabScreen = () => (
  <Tab.Navigator
  tabBarOptions={bottomOptions}>
    <Tab.Screen
      name={screenNames.PROFILE_SCREEN}
      component={ProfileScreen}
      options={{tabBarLabel: 'Профиль'}}
    />
    <Tab.Screen
      name={screenNames.FEED_SCREEN}
      component={FeedScreen}
      options={{tabBarLabel: 'Лента'}}
    />
  </Tab.Navigator>
);
