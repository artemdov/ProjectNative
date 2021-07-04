import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import {ProfileScreen} from '../../screens/Profile/ProfileScreen';
import {LandingScreen} from '../../screens/Landing/LandingScreen';
import {withoutHeader} from '../../components/common/withoutHeader';

const Stack = createStackNavigator<any>();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenNames.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{header: withoutHeader}}
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
