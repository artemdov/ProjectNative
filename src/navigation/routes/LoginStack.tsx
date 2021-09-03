import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import AuthStack from './AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import {setLoadingStatus, setUser} from '../../store/actions/authAction';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {editProfileScreenOptions, myOptions, withoutHeader} from '../options';
import {isLoadingSelector, getUserSelector, isProfileSetupFinishedSelector} from '../../store/selectors';
import {LoadingScreen} from '../../screens/Loading/LoadingScreen';
import {MainTabScreen} from '../../screens/TabScreen/MainTabScreen';
import {LoginScreen} from "../../screens/Auth/LoginScreen";
import {CreateProfileInfoScreen} from "../../screens/Auth/CreateProfileInfoScreen";

const Stack = createStackNavigator<any>();

export const LoginStack = () => {
  const isProfileSetupFinished = useSelector(isProfileSetupFinishedSelector);

  return (
    <Stack.Navigator>
      {isProfileSetupFinished ?
          (<Stack.Screen
          name={screenNames.LOGIN_SCREEN}
          component={LoginScreen}
          options={withoutHeader()}
      />) :
      (<Stack.Screen
          name={screenNames.CREATE_PROFILE_INFO_SCREEN}
          component={CreateProfileInfoScreen}
          // @ts-ignore
          options={{...editProfileScreenOptions, headerTitle: 'Создать профиль'}}
      />)}
    </Stack.Navigator>
  );
};
