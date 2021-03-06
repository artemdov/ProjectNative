import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {editProfileOptions, withoutHeader} from '../options';
import screenNames from '../ScreenNames';
import {ProfileScreen} from '../../screens/Profile/ProfileScreen';
import {CreateProfileInfoScreen} from '../../screens/Auth/CreateProfileInfoScreen';
import {useSelector} from 'react-redux';
import {
  getUserInfoSelector,
  isProfileSetupFinishedSelector,
} from '../../store/selectors';
import {UserInfoType} from '../../types/types';

const Stack = createStackNavigator();

export const ProfileStack: React.FC<any> = () => {
  const isProfileSetupFinished = useSelector(isProfileSetupFinishedSelector);
  const userInfo: UserInfoType | null = useSelector(getUserInfoSelector);
  const isUserInfoCompleted = userInfo?.firstName && userInfo.lastName;

  return (
    <Stack.Navigator>
      {isUserInfoCompleted && isProfileSetupFinished ? (
        <Stack.Screen
          name={screenNames.PROFILE_SCREEN}
          component={ProfileScreen}
          options={withoutHeader()}
        />
      ) : (
        <Stack.Screen
          name={screenNames.CREATE_PROFILE_INFO_SCREEN}
          component={CreateProfileInfoScreen}
          // @ts-ignore
          options={{
            ...editProfileOptions,
            headerTitle: 'Создать профиль',
          }}
        />
      )}
      <Stack.Screen
        name={screenNames.EDIT_PROFILE_SCREEN}
        component={CreateProfileInfoScreen}
        // @ts-ignore
        options={editProfileOptions}
      />
    </Stack.Navigator>
  );
};
