import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import {ProfileScreen} from '../../screens/Profile/ProfileScreen';
import {LandingScreen} from '../../screens/Landing/LandingScreen';

const Stack = createStackNavigator<any>();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenNames.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name={screenNames.LANDING_SCREEN}
        component={LandingScreen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
export default MainStack;
