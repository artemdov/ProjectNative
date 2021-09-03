import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import {useSelector} from 'react-redux';
import {editProfileScreenOptions, withoutHeader} from '../options';
import {isProfileSetupFinishedSelector} from '../../store/selectors';
import {LoginScreen} from '../../screens/Auth/LoginScreen';
import {CreateProfileInfoScreen} from '../../screens/Auth/CreateProfileInfoScreen';

const Stack = createStackNavigator<any>();

export const LoginStack = () => {
  const isProfileSetupFinished = useSelector(isProfileSetupFinishedSelector);

  return (
    <Stack.Navigator>
      {isProfileSetupFinished ? (
        <Stack.Screen
          name={screenNames.LOGIN_SCREEN}
          component={LoginScreen}
          options={withoutHeader()}
        />
      ) : (
        <Stack.Screen
          name={screenNames.CREATE_PROFILE_INFO_SCREEN}
          component={CreateProfileInfoScreen}
          // @ts-ignore
          options={{
            ...editProfileScreenOptions,
            headerTitle: 'Создать профиль',
          }}
        />
      )}
    </Stack.Navigator>
  );
};
