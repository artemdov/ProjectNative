import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import {LandingScreen} from '../../screens/Landing/LandingScreen';
import {RegistrationScreen} from '../../screens/Auth/RegistrationScreen';
import {
    EditProfileScreenOptions,
    myOptions,
    withoutHeader,
} from '../options';
import {LoginScreen} from '../../screens/Auth/LoginScreen';
import {MainTabScreen} from "../../screens/TabScreen/MainTabScreen";
import {CreateProfileInfoScreen} from "../../screens/Auth/CreateProfileInfoScreen";

const Stack = createStackNavigator();

const UserInfoStack = () => {
    return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenNames.CREATE_PROFILE_INFO_SCREEN}
        component={CreateProfileInfoScreen}
          // @ts-ignore
        options={{...EditProfileScreenOptions, headerTitle: 'Создать профиль'}}
      />
        <Stack.Screen
            name={screenNames.MAIN_BOTTOM_SCREEN}
            component={MainTabScreen}
            options={withoutHeader()}
        />
    </Stack.Navigator>
  );
};

export default UserInfoStack;
