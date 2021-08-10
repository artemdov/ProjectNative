import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {withoutHeader} from '../options';
import screenNames from '../ScreenNames';
import {ListDataScreen} from '../../screens/API_Data/ListDataScreen';
import {DescriptionScreen} from '../../screens/API_Data/DescriptionScreen';

const Stack = createStackNavigator();

export const APIDataStack: React.FC<any> = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={screenNames.LIST_DATA_SCREEN}
      component={ListDataScreen}
      options={withoutHeader()}
    />
    <Stack.Screen
      name={screenNames.DESCRIPTION_SCREEN}
      component={DescriptionScreen}
      options={withoutHeader()}
    />
  </Stack.Navigator>
);
