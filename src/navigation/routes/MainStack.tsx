import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import {RegistrationScreen} from '../../Screens/RegistrationScreen';
import {myOptions} from '../options';

const Stack = createStackNavigator<any>();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenNames.REGISTRATION_SCREEN}
        component={RegistrationScreen}
        options={{...myOptions, title: 'Регистрация'}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
