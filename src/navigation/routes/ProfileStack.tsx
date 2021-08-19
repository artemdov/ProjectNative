import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EditProfileScreenOptions, withoutHeader} from '../options';
import screenNames from '../ScreenNames';
import {ProfileScreen} from '../../screens/Profile/ProfileScreen';
import {EditProfileScreen} from '../../screens/Profile/EditProfileScreen';

const Stack = createStackNavigator();

export const ProfileStack: React.FC<any> = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={screenNames.PROFILE_SCREEN}
      component={ProfileScreen}
      options={withoutHeader()}
    />
    <Stack.Screen
      name={screenNames.EDIT_PROFILE_SCREEN}
      component={EditProfileScreen}
      // @ts-ignore
      options={EditProfileScreenOptions}
    />
  </Stack.Navigator>
);
