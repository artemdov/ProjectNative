import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {CustomButton} from '../../components/common/CustomButton';
import {useDispatch} from 'react-redux';
import {onSubmitLogOut} from '../../store/actions/authAction';
import screenNames from '../../navigation/ScreenNames';
import {rem} from '../../consts/size';

export const ProfileScreen: React.FC<any> = ({navigation}) => {
  const dispatch = useDispatch();

  const onPressLogout = () => {
    dispatch(onSubmitLogOut());
    navigation.navigate(screenNames.LANDING_SCREEN);
  };

  return (
    <SafeAreaView style={styles.blockMainScreen}>
      <Text style={styles.header}>Привет</Text>
      <CustomButton title={'Выход'} onPress={onPressLogout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  blockMainScreen: {
    flex: 1,
    backgroundColor: '#8a2be2',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: rem(15),
  },
  header: {
    textAlign: 'center',
    fontSize: rem(26),
    marginTop: rem(40),
    color: '#ffff',
  },
});
