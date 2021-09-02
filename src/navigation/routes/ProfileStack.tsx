import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  EditProfileScreenOptions,
  withoutHeader,
} from '../options';
import screenNames from '../ScreenNames';
import {ProfileScreen} from '../../screens/Profile/ProfileScreen';
import {EditProfileScreen} from '../../screens/Profile/EditProfileScreen';
import {CreateProfileInfoScreen} from "../../screens/Auth/CreateProfileInfoScreen";
import {useSelector} from "react-redux";
import {isInfoSelector} from "../../store/selectors";

const Stack = createStackNavigator();

export const ProfileStack: React.FC<any> = () => {
    const isInfo = useSelector(isInfoSelector)
    console.log('isInfo', isInfo)

    return (
        <Stack.Navigator>
            {isInfo ?
                (<Stack.Screen
                    name={screenNames.PROFILE_SCREEN}
                    component={ProfileScreen}
                    options={withoutHeader()}
                />) :
                (<Stack.Screen
                    name={screenNames.CREATE_PROFILE_INFO_SCREEN}
                    component={CreateProfileInfoScreen}
                    // @ts-ignore
                    options={{...EditProfileScreenOptions, headerTitle: 'Создать профиль'}}
                />)}
            <Stack.Screen
                name={screenNames.EDIT_PROFILE_SCREEN}
                component={EditProfileScreen}
                // @ts-ignore
                options={EditProfileScreenOptions}
            />

        </Stack.Navigator>
    )
};
