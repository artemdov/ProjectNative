import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {artworkDetailOptions, withoutHeader} from '../options';
import screenNames from '../ScreenNames';
import {ArtworkListScreen} from '../../screens/Artworks/ArtworkListScreen';
import {ArtworkDetailScreen} from '../../screens/Artworks/ArtworkDetailScreen';

const Stack = createStackNavigator();

export const ArtworkStack: React.FC<any> = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={screenNames.ARTWORK_LIST_SCREEN}
      component={ArtworkListScreen}
      options={withoutHeader()}
    />
    <Stack.Screen
      name={screenNames.ARTWORK_DETAIL_SCREEN}
      component={ArtworkDetailScreen}
      options={artworkDetailOptions}
    />
  </Stack.Navigator>
);
