import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import screenNames from '../ScreenNames';
import {bottomTabBarOptions} from '../options';
import {Image, StyleSheet} from 'react-native';
import {rem} from '../../consts/size';
import {FeedPostStack} from './FeedPostStack';
import {ArtworkStack} from './ArtworkStack';
import {ProfileStack} from './ProfileStack';
import {useSelector} from 'react-redux';
import {isProfileSetupFinishedSelector} from '../../store/selectors';

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

export const MainTabScreen = () => {
  const isProfileSetupFinished = useSelector(isProfileSetupFinishedSelector);

  return (
    <Tab.Navigator tabBarOptions={bottomTabBarOptions}>
      <Tab.Screen
        name={screenNames.PROFILE_STACK}
        component={ProfileStack}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: profileTabBarIcon,
        }}
      />
      {isProfileSetupFinished && (
        <Tab.Screen
          name={screenNames.FEED_POST_STACK}
          component={FeedPostStack}
          options={{
            tabBarLabel: 'Лента',
            tabBarIcon: FeedTabBarIcon,
          }}
        />
      )}
      {isProfileSetupFinished && (
        <Tab.Screen
          name={screenNames.ARTWORK_API_STACK}
          component={ArtworkStack}
          options={{
            tabBarLabel: 'Данные',
            tabBarIcon: ArtworkTabBarIcon,
          }}
        />
      )}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: rem(25),
    height: rem(22),
    margin: rem(3),
  },
});
