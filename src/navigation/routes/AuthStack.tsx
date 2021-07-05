import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import {LandingScreen} from '../../screens/Landing/LandingScreen';
import {RegistrationScreen} from '../../screens/Auth/RegistrationScreen';
import {myOptions, withoutHeader} from '../options';
import {LoginScreen} from '../../screens/Auth/LoginScreen';

const Stack = createStackNavigator<any>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenNames.LANDING_SCREEN}
        component={LandingScreen}
        options={withoutHeader()}
      />
      <Stack.Screen
        name={screenNames.LOGIN_SCREEN}
        component={LoginScreen}
        options={myOptions}
      />
      <Stack.Screen
        name={screenNames.REGISTRATION_SCREEN}
        component={RegistrationScreen}
        options={{...myOptions, title: 'Регистрация'}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
