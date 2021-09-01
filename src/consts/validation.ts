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
export const UserInfoSchema = Yup.object().shape({
  name: Yup.string()
      .min(2, 'Слишком короткое слово')
      .max(30, 'Слишком длинное слово')
      .required('Введите имя'),
  lastName: Yup.string()
      .min(2, 'Слишком короткое слово')
      .max(30, 'Слишком длинное слово')
      .required('Введите фамилию'),
  phone: Yup.number()
      .min(2, 'Слишком короткое имя')
      .max(30, 'Слишком длинное имя')
      .required('Введите номер'),
  country: Yup.string()
      .min(2, 'Слишком короткое слово')
      .max(30, 'Слишком длинное слово')
      .required('Введите страну'),
});
