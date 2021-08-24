import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import {rem} from '../../consts/size';
import {CustomButtonType} from '../../types/types';

export const CustomFormButton: React.FC<CustomButtonType> = ({title, onPress}) => (
  <TouchableHighlight style={styles.button} onPress={onPress}>
    <Text style={styles.textStyle}>{title}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    borderRadius: rem(30),
    paddingVertical: rem(15),
    backgroundColor: '#0c0c30',
    textAlign: 'center',
  },
  textStyle: {
    color: '#ffffff',
    fontSize: rem(15),
  },
});
