import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import AuthStack from './AuthStack';
import {useDispatch} from 'react-redux';
import {setIsLoggedIn, setUser} from '../../store/actions/authAction';
import auth from '@react-native-firebase/auth';
import MainStack from './MainStack';
import {isLoggedIn} from '../../store/selectors';
import {withoutHeader} from '../../components/common/withoutHeader';

const Stack = createStackNavigator<any>();

export const AppStack = () => {
  const dispatch = useDispatch();

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
          options={{header: withoutHeader}}
        />
      ) : (
        <Stack.Screen
          name={screenNames.AUTH_STACK}
          component={AuthStack}
          options={{header: withoutHeader}}
        />
      )}
    </Stack.Navigator>
  );
};
