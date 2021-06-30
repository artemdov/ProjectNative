import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Router from './src/navigation/Router';
import {store} from './src/store/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.screen}>
        <Router />
      </SafeAreaView>
    </Provider>
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
