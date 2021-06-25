import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Введите корректные данные')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(4, 'Минимум 4 символа')
    .max(20, 'Максимум 20 символов')
    .required('Обязательное поле'),
});
export const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Введите корректные данные')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(4, 'Минимум 4 символа')
    .max(20, 'Максимум 50 символов')
    .required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
    .required('Обязательное поле'),
});
