import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import {ProfileScreen} from '../../screens/Profile/ProfileScreen';
import {LandingScreen} from '../../screens/Landing/LandingScreen';
import {withoutHeader} from '../options';

const Stack = createStackNavigator<any>();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenNames.PROFILE_SCREEN}
        component={ProfileScreen}
        options={withoutHeader()}
      />
      <Stack.Screen
        name={screenNames.LANDING_SCREEN}
        component={LandingScreen}
        options={withoutHeader()}
      />
    </Stack.Navigator>
  );
};
export default MainStack;
