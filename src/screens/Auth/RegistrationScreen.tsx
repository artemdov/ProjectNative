import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomButton} from '../../components/common/CustomButton';
import {CustomTextInput} from '../../components/common/CustomTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {RegistrationSchema} from '../../consts/validation';
import {OnSubmitRegistrationType} from '../../types/types';

export const RegistrationScreen = () => {
  const onSubmit = ({
    email,
    password,
    confirmPassword,
  }: OnSubmitRegistrationType) => {
    console.log(email, password, confirmPassword);
  };

  return (
    <KeyboardAwareScrollView style={styles.containerKeyboard}>
      <View style={styles.blockSecondScreen}>
        <Text style={styles.header}>Заполните поля и нажмите "Продолжить"</Text>
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
              <View style={styles.containerInput}>
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
              </View>
              <CustomButton title={'Продолжить'} onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  containerKeyboard: {
    backgroundColor: '#8a2be2',
  },
  blockSecondScreen: {
    width: '100%',
    height: '100%',
  },
  header: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 60,
    color: '#ffff',
    marginBottom: 50,
  },
  containerInput: {
    marginBottom: 60,
  },
  wrapperElements: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
