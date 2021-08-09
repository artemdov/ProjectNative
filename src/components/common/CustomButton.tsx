import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import {width as w, rem, vrem} from '../../consts/size';
import {CustomButtonType} from '../../types/types';

export const CustomButton: React.FC<CustomButtonType> = ({title, onPress}) => (
  <TouchableHighlight style={styles.btn} onPress={onPress}>
    <Text style={styles.textStyle}>{title}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    alignItems: 'center',
    borderRadius: vrem(30),
    paddingVertical: vrem(15),
    backgroundColor: '#0c0c30',
    textAlign: 'center',
  },
  textStyle: {
    color: '#ffffff',
    fontSize: rem(15),
  },
});
