import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileScreen} from '../Profile/ProfileScreen';
import screenNames from '../../navigation/ScreenNames';
import {bottomTabBarOptions} from '../../navigation/options';
import {Image, StyleSheet} from 'react-native';
import {width as w, height as h} from '../../consts/size';
import {FeedPostStack} from '../../navigation/routes/FeedPostStack';
import {focusedType} from '../../types/types';

const Tab = createBottomTabNavigator<any>();
const notFocused = 0.51;
const profileTabBarIcon: any = ({focused}: focusedType) => (
  <Image
    style={[styles.icon, {opacity: focused ? 1 : notFocused}]}
    source={require('../../assets/icon_profile.png')}
  />
);
const FeedTabBarIcon: any = ({focused}: focusedType) => (
  <Image
    style={[styles.icon, {opacity: focused ? 1 : notFocused}]}
    source={require('../../assets/icon_feed.png')}
  />
);

export const MainTabScreen = () => (
  <Tab.Navigator tabBarOptions={bottomTabBarOptions}>
    <Tab.Screen
      name={screenNames.PROFILE_SCREEN}
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Профиль',
        tabBarIcon: profileTabBarIcon,
      }}
    />
    <Tab.Screen
      name={screenNames.FEED_POST_STACK}
      component={FeedPostStack}
      options={{
        tabBarLabel: 'Лента',
        tabBarIcon: FeedTabBarIcon,
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  icon: {
    width: w / 15,
    height: h / 35,
    marginTop: 5,
  },
});
