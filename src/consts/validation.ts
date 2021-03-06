import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Введите корректные данные')
    .required('Введите email'),
  password: Yup.string()
    .required('Введите пароль')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/,
      'Введите корректный пароль',
    ),
});
export const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Введите корректные данные')
    .required('Введите email'),
  password: Yup.string()
    .required('Введите пароль')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/,
      'Введите корректный пароль',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
    .required('Заполните поле'),
});
