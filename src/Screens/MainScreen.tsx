import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../common/AppButton';
import {height as h} from '../consts/size';

export const MainScreen: React.FC<any> = ({navigation}) => {
  return (
    <View style={styles.blockMainScreen}>
      <Text style={styles.header}>Добро пожаловать в приложение</Text>
      <View style={styles.buttonEnter}>
        <AppButton
          title={'Вход'}
          onPress={() => {
            navigation.navigate('EnterScreen');
          }}
        />
      </View>
      <View style={styles.buttonRegistration}>
        <AppButton
          title={'Регистрация'}
          onPress={() => {
            navigation.navigate('RegistrationScreen');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blockMainScreen: {
    backgroundColor: '#8a2be2',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  header: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 110,
    color: '#ffff',
  },
  buttonEnter: {
    marginTop: h / 2 - 30,
  },
  buttonRegistration: {
    marginTop: 12,
    paddingBottom: 120,
  },
});
