import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CustomFormButton} from '../../components/common/CustomFormButton';
import {rem, vrem} from '../../consts/size';
import screenNames from '../../navigation/ScreenNames';

export const LandingScreen: React.FC<any> = ({navigation}) => {
  const onPressSubmit = () => {
    navigation.navigate(screenNames.LOGIN_STACK);
  };

  const onPressRegister = () => {
    navigation.navigate(screenNames.REGISTRATION_SCREEN);
  };

  return (
    <SafeAreaView style={styles.blockMainScreen}>
      <Text style={styles.header}>Добро пожаловать в приложение</Text>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonEnter}>
          <CustomFormButton title="Вход" onPress={onPressSubmit} />
        </View>
        <View style={styles.buttonRegistration}>
          <CustomFormButton title="Регистрация" onPress={onPressRegister} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  blockMainScreen: {
    flex: 1,
    backgroundColor: '#8a2be2',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: rem(26),
    marginBottom: vrem(190),
    color: '#ffff',
  },
  buttonWrapper: {
    width: '100%',
    paddingHorizontal: rem(15),
    top: vrem(90),
  },
  buttonEnter: {
    paddingVertical: vrem(15),
  },
  buttonRegistration: {
    marginTop: vrem(12),
  },
});
