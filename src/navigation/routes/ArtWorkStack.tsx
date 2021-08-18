import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ArtworkDetailScreenOptions, withoutHeader} from '../options';
import screenNames from '../ScreenNames';
import {ArtworkListScreen} from '../../screens/ArtworkData/ArtworkListScreen';
import {ArtworkDetailScreen} from '../../screens/ArtworkData/ArtworkDetailScreen';

const Stack = createStackNavigator();

export const ArtWorkStack: React.FC<any> = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={screenNames.ARTWORK_LIST_SCREEN}
      component={ArtworkListScreen}
      options={withoutHeader()}
    />
    <Stack.Screen
      name={screenNames.ARTWORK_DETAIL_SCREEN}
      component={ArtworkDetailScreen}
      options={ArtworkDetailScreenOptions}
    />
  </Stack.Navigator>
);
