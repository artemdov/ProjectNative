import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {rem, vrem} from '../../consts/size';
import {CustomButtonType} from '../../types/types';

export const CustomProfileButton: React.FC<CustomButtonType> = ({
  title,
  onPress,
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.textStyle}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderColor: '#2e64e5',
    borderWidth: rem(2),
    borderRadius: rem(3),
    paddingVertical: vrem(8),
    paddingHorizontal: rem(12),
    marginHorizontal: rem(5),
  },
  textStyle: {
    textAlign: 'center',
    color: '#2e64e5',
  },
});
