import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {APIDataScreenOptions, withoutHeader} from '../options';
import screenNames from '../ScreenNames';
import {ArtworkListScreen} from '../../screens/API_Data/ArtworkListScreen';
import {ArtworkDetailScreen} from '../../screens/API_Data/ArtworkDetailScreen';

const Stack = createStackNavigator();

export const ArtWorkAPIStack: React.FC<any> = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={screenNames.ARTWORK_LIST_SCREEN}
      component={ArtworkListScreen}
      options={withoutHeader()}
    />
    <Stack.Screen
      name={screenNames.ARTWORK_DETAIL_SCREEN}
      component={ArtworkDetailScreen}
      options={APIDataScreenOptions}
    />
  </Stack.Navigator>
);
