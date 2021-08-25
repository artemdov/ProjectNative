import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {CustomFormButton} from '../../components/common/CustomFormButton';
import {CustomFormTextInput} from '../../components/common/CustomFormTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LoginSchema} from '../../consts/validation';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {onSubmitLogIn} from '../../store/actions/authAction';
import {rem, vrem} from '../../consts/size';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const onSubmit = (values: any) => {
    dispatch(onSubmitLogIn(values));
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView style={styles.containerKeyboard}>
        <View>
          <Text style={styles.header}>
            Войдите, чтобы начать использовать приложение
          </Text>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={onSubmit}
            validationSchema={LoginSchema}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <View style={styles.wrapperElements}>
                <CustomFormTextInput
                  label={'Email'}
                  error={!!errors.email && touched.email}
                  errorMessage={errors.email}
                  value={values.email}
                  onChangePassword={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                <CustomFormTextInput
                  label={'Пароль'}
                  error={!!errors.password && touched.password}
                  errorMessage={errors.password}
                  value={values.password}
                  onChangePassword={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={true}
                />
                <View style={styles.button}>
                  <CustomFormButton title='Вход' onPress={handleSubmit} />
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
    marginTop: vrem(55),
  },
  wrapperElements: {
    height: '70%',
    paddingHorizontal: rem(15),
    paddingVertical: vrem(68),
  },
});
