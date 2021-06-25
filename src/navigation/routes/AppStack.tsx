import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import AuthStack from './AuthStack';

const Stack = createStackNavigator<any>();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenNames.AUTH_STACK}
        component={AuthStack}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
