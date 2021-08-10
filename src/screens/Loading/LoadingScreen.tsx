import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';

export const LoadingScreen: React.FC<any> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator color="#000000" size="large" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a2be2',
    justifyContent: 'center',
  },
});
