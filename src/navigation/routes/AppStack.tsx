import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import AuthStack from './AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLoggedIn, setLoadingStatus, setUser} from '../../store/actions/authAction';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import MainStack from './MainStack';
import {withoutHeader} from '../options';
import {isLoadingSelector, isLoggedInSelector, setUserSelector} from '../../store/selectors';
import {LoadingScreen} from "../../screens/LoadingScreen";

const Stack = createStackNavigator<any>();

export const AppStack = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector)
  const isUser = useSelector(setUserSelector)

    const onAuthStateChanged = (user: FirebaseAuthTypes.UpdateProfile | null) => {
    dispatch(setUser(user));
    dispatch(setLoadingStatus(false))
  };

    useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  return (
    <Stack.Navigator>
      {isLoading ? (<Stack.Screen
          name={screenNames.LOADING_SCREEN}
          component={LoadingScreen}
          options={withoutHeader()}
      />) :
      isUser ? (
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
