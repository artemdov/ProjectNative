import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import AuthStack from './AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLoggedIn, setUser} from '../../store/actions/authAction';
import auth from '@react-native-firebase/auth';
import MainStack from './MainStack';
import {withoutHeader} from '../options';
import {isLoggedInSelector} from "../../store/selectors";

const Stack = createStackNavigator<any>();

export const AppStack = () => {
  const dispatch = useDispatch();
 const isInitialize = useSelector(isLoggedInSelector)

  const onAuthStateChanged = (user: any) => {
    dispatch(setUser(user));
    if (isInitialize) {
      dispatch(setIsLoggedIn(true));
    }
  };
  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  return (
    <Stack.Navigator>
      {isInitialize ? (
        <Stack.Screen
          name={screenNames.MAIN_STACK}
          component={MainStack}
          options={withoutHeader()}
        />
      ) : (
        <Stack.Screen
          name={screenNames.AUTH_STACK}
          component={AuthStack}
          options={withoutHeader()}
        />
      )}
    </Stack.Navigator>
  );
};
