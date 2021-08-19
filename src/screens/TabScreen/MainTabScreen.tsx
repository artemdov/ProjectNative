import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import screenNames from '../../navigation/ScreenNames';
import {bottomTabBarOptions} from '../../navigation/options';
import {Image, StyleSheet} from 'react-native';
import {rem} from '../../consts/size';
import {FeedPostStack} from '../../navigation/routes/FeedPostStack';
import {ArtworkStack} from '../../navigation/routes/ArtworkStack';
import {ProfileStack} from '../../navigation/routes/ProfileStack';

const Tab = createBottomTabNavigator<any>();
const notFocused = 0.51;

const ArtworkTabBarIcon: React.FC<any> = ({focused}) => (
  <Image
    style={[styles.icon, {opacity: focused ? 1 : notFocused}]}
    source={require('../../assets/icon_favorites.png')}
  />
);
const profileTabBarIcon: React.FC<any> = ({focused}) => (
  <Image
    style={[styles.icon, {opacity: focused ? 1 : notFocused}]}
    source={require('../../assets/icon_profile.png')}
  />
);

const FeedTabBarIcon: React.FC<any> = ({focused}) => (
  <Image
    style={[styles.icon, {opacity: focused ? 1 : notFocused}]}
    source={require('../../assets/icon_feed.png')}
  />
);

export const MainTabScreen = () => (
  <Tab.Navigator tabBarOptions={bottomTabBarOptions}>
    <Tab.Screen
      name={screenNames.PROFILE_STACK}
      component={ProfileStack}
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
    <Tab.Screen
      name={screenNames.ARTWORK_API_STACK}
      component={ArtworkStack}
      options={{
        tabBarLabel: 'Данные',
        tabBarIcon: ArtworkTabBarIcon,
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  icon: {
    width: rem(25),
    height: rem(22),
    margin: rem(3),
  },
});
