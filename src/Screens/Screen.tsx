import React from 'react';
import {MainScreen} from './MainScreen';
import {NavigationContainer} from '@react-navigation/native';
import {EnterScreen} from './EnterScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {RegistrationScreen} from './RegistrationScreen';
import screenNames from '../navigation/ScreenNames';

const Stack = createStackNavigator<any>();
export const myOptions = {
  title: 'Вход',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#0c0c30',
  },
};

export const Screen = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default Screen;
