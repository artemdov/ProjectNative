import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Screen from './src/Screens/Screen';

const App = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Screen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#8a2be2',
    fontWeight: '700',
    width: '100%',
    height: '100%',
  },
});

export default App;
