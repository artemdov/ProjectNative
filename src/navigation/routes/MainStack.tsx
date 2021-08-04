import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import {ProfileScreen} from '../../screens/Profile/ProfileScreen';
import {LandingScreen} from '../../screens/Landing/LandingScreen';
import {withoutHeader} from '../options';
import {MainTabScreen} from '../../screens/TabScreen/MainTabScreen';

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
        name={screenNames.MAIN_BOTTOM_SCREEN}
        component={MainTabScreen}
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
