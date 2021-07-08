import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const LoadingScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#000000" size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a2be2',
    justifyContent: 'center',
  },
});
