import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CustomButton} from '../../components/common/CustomButton';
import {CustomTextInput} from '../../components/common/CustomTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {RegistrationSchema} from '../../consts/validation';
import {useDispatch} from 'react-redux';
import {onSubmitRegistration} from '../../store/actions/authAction';
import screenNames from '../../navigation/ScreenNames';
import {rem, vrem} from '../../consts/size';

export const RegistrationScreen: React.FC<any> = ({navigation}) => {
  const dispatch = useDispatch();
  const onSubmit = (values: any) => {
    dispatch(onSubmitRegistration(values));
    navigation.navigate(screenNames.LOGIN_SCREEN);
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView style={styles.containerKeyboard}>
        <View>
          <Text style={styles.header}>
            Заполните поля и нажмите "Продолжить"
          </Text>
          <Formik
            initialValues={{email: '', password: '', confirmPassword: ''}}
            onSubmit={onSubmit}
            validationSchema={RegistrationSchema}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <View style={styles.wrapperElements}>
                <CustomTextInput
                  label={'Email'}
                  error={!!errors.email && touched.email}
                  errorMessage={errors.email}
                  value={values.email}
                  onChangePassword={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                <CustomTextInput
                  label={'Пароль'}
                  error={!!errors.password && touched.password}
                  errorMessage={errors.password}
                  value={values.password}
                  onChangePassword={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={true}
                />
                <CustomTextInput
                  label={'Повторите Пароль'}
                  error={!!errors.confirmPassword && touched.confirmPassword}
                  errorMessage={errors.confirmPassword}
                  value={values.confirmPassword}
                  onChangePassword={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  secureTextEntry={true}
                />
                <View style={styles.button}>
                  <CustomButton title={'Продолжить'} onPress={handleSubmit} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerKeyboard: {
    backgroundColor: '#8a2be2',
  },
  header: {
    textAlign: 'center',
    fontSize: rem(26),
    marginVertical: vrem(50),
    color: '#ffff',
  },
  button: {
    marginTop: vrem(42),
  },
  wrapperElements: {
    height: '65%',
    paddingHorizontal: rem(15),
    paddingVertical: vrem(65),
  },
});
