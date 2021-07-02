import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '../ScreenNames';
import AuthStack from './AuthStack';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../types/types";
import {isAuthenticated, setUser} from "../../store/actions/authAction";
import auth from "@react-native-firebase/auth";
import MainStack from "./MainStack";

const Stack = createStackNavigator<any>();

export const AppStack = () => {
    const dispatch = useDispatch();
    const authenticated = useSelector<AppRootStateType, boolean>(
        state => state.auth.authenticated,
    );
    console.log(authenticated, 'authenticated')

    const onAuthStateChanged = (user: any) => {
        dispatch(setUser(user));
        if (authenticated) {
            dispatch(isAuthenticated(true));
        }
    };
    useEffect(() => {
        return auth().onAuthStateChanged(onAuthStateChanged);
    }, []);


    return (
    <Stack.Navigator>
        {authenticated ?
            <Stack.Screen
                name={screenNames.MAIN_STACK}
                component={MainStack}
                options={{header: () => null}}
            /> :
            <Stack.Screen
            name={screenNames.AUTH_STACK}
            component={AuthStack}
            options={{header: () => null}}
            />}
    </Stack.Navigator>
  );
};
