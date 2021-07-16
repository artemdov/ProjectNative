import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Router from './src/navigation/Router';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCIN8UO7eYdFEBJR6uiY7r6jHLVkvx_F2A",
  authDomain: "projectwithdb.firebaseapp.com",
  databaseURL: "https://projectwithdb-default-rtdb.firebaseio.com",
  projectId: "projectwithdb",
  storageBucket: "projectwithdb.appspot.com",
  messagingSenderId: "341725869403",
  appId: "1:341725869403:web:5e6acb87273bae7085967e",
  measurementId: "G-LHSSWFY767"
};
// Initialize Firebase
if(!firebase.apps.length)
firebase.initializeApp(firebaseConfig);

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
