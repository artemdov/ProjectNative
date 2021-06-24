import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import {MainScreen} from '../../Screens/MainScreen';
import {EnterScreen} from '../../Screens/EnterScreen';
import {RegistrationScreen} from '../../Screens/RegistrationScreen';
import {myOptions} from '../options';

const Stack = createStackNavigator<any>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenNames.MAIN_SCREEN}
        component={MainScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={screenNames.ENTER_SCREEN}
        component={EnterScreen}
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
