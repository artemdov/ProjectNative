import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import AuthStack from './AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../types/types';
import {setIsLoggedIn, setUser} from '../../store/actions/authAction';
import auth from '@react-native-firebase/auth';
import MainStack from './MainStack';

const Stack = createStackNavigator<any>();

export const AppStack = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    state => state.auth.isLoggedIn,
  );

  const onAuthStateChanged = (user: any) => {
    dispatch(setUser(user));
    if (isLoggedIn) {
      dispatch(setIsLoggedIn(true));
    }
  };
  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name={screenNames.MAIN_STACK}
          component={MainStack}
          options={{header: () => null}}
        />
      ) : (
        <Stack.Screen
          name={screenNames.AUTH_STACK}
          component={AuthStack}
          options={{header: () => null}}
        />
      )}
    </Stack.Navigator>
  );
};
