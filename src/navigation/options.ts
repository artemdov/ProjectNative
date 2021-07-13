import {height as h} from '../consts/size';
import {Button, View} from "react-native";
import React from "react";

export const myOptions = {
  title: 'Вход',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#0c0c30',
    height: h / 15,
  },
  headerTitleStyle: {
    fontSize: h / 30,
  },
};
export const bottomTabBarOptions = {
  labelStyle: {
    fontSize: 12,
    lineHeight: 13,
    marginBottom: 10,
    letterSpacing: -0.33,
  },
  activeTintColor: '#ffffff',
  inactiveTintColor: '#818181',
  activeBackgroundColor: '#4f016d',
  inactiveBackgroundColor: '#4f016d',
};
export const feedPostOptions = {
  headerStyle: {
    shadowColor: '#fff',
    elevation: 0,
  },
};
export const withoutHeader = () => ({headerShown: false});
