import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileScreen} from '../Profile/ProfileScreen';
import {FeedScreen} from '../Feed/FeedScreen';
import screenNames from '../../navigation/ScreenNames';
import {bottomTabBarOptions} from "../../navigation/options";
import {Image, StyleSheet} from "react-native";

const Tab = createBottomTabNavigator<any>();
const notFocused = 0.51

export const MainTabScreen = () => (
  <Tab.Navigator
  tabBarOptions={bottomTabBarOptions}>
    <Tab.Screen
      name={screenNames.PROFILE_SCREEN}
      component={ProfileScreen}
      options={{tabBarLabel: 'Профиль',
          tabBarIcon: ({focused}) => (
              <Image style={[styles.icon, {opacity: focused ? 1 : notFocused}]} source={require('../../assets/icon_profile.png')} />
          )
          }}
    />
    <Tab.Screen
      name={screenNames.FEED_SCREEN}
      component={FeedScreen}
      options={{tabBarLabel: 'Лента',
          tabBarIcon: ({focused}) => (
              <Image style={[styles.icon, {opacity: focused ? 1 : notFocused}]} source={require('../../assets/icon_feed.png')} />
          )}}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
    icon: {
        width: 16,
        height: 16,
        marginTop: 8
    }
})
