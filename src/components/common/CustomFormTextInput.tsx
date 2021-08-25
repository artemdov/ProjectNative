import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {height as h, rem, vrem} from '../../consts/size';
import {width as w} from '../../consts/size';
import {CustomFormTextInputType} from '../../types/types';

export const CustomFormTextInput: React.FC<CustomFormTextInputType> = ({
  onChangePassword,
  onBlur,
  value,
  label,
  error,
  errorMessage,
  ...props
}) => {
  return (
    <View style={[styles.container, error && styles.errorWrapperContainer]}>
      {label && <Text style={styles.textInputHeader}>{label}</Text>}
      <TextInput
        style={styles.textInput}
        onChangeText={onChangePassword}
        onBlur={onBlur}
        value={value}
        {...props}
      />
      {error && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    paddingHorizontal: rem(10),
    paddingVertical: vrem(24),
    marginVertical: vrem(5),
    paddingTop: rem(5),
    backgroundColor: '#0c0c30',
    borderRadius: 10,
    borderColor: '#0c0c30',
    borderWidth: 2,
  },
  errorWrapperContainer: {
    borderColor: '#ff1818',
    paddingBottom: rem(35),
  },
  textInput: {
    color: '#40e0d0',
    fontSize: rem(16),
  },
  textInputHeader: {
    color: '#40e0d0',
    fontSize: rem(12),
  },
  errorMessage: {
    fontWeight: 'bold',
    fontSize: rem(12),
    color: '#ee0000',
  },
});
