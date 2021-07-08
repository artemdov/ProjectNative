import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomButton} from '../../components/common/CustomButton';
import {width as w, height as h} from '../../consts/size';
import screenNames from '../../navigation/ScreenNames';

export const LandingScreen: React.FC<any> = ({navigation}) => {
  const onPressSubmit = () => {
    navigation.navigate(screenNames.LOGIN_SCREEN);
  };
  const onPressRegister = () => {
    navigation.navigate(screenNames.REGISTRATION_SCREEN);
  };
  return (
    <View style={styles.blockMainScreen}>
      <Text style={styles.header}>Добро пожаловать в приложение</Text>
      <View style={styles.buttonEnter}>
        <CustomButton title={'Вход'} onPress={onPressSubmit} />
      </View>
      <View style={styles.buttonRegistration}>
        <CustomButton title={'Регистрация'} onPress={onPressRegister} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blockMainScreen: {
    backgroundColor: '#8a2be2',
    flexDirection: 'column',
    alignItems: 'center',
    width: w,
    height: h,
  },
  header: {
    textAlign: 'center',
    fontSize: h / 26,
    marginTop: h / 9,
    color: '#ffff',
  },
  buttonEnter: {
    marginTop: h / 2,
  },
  buttonRegistration: {
    marginTop: 12,
    paddingBottom: 120,
  },
});
