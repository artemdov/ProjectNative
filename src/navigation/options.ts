import {rem, vrem} from '../consts/size';

export const commonHeaderOptions = {
  backgroundColor: '#0c0c30',
  height: vrem(60),
};
export const loginOptions = {
  title: 'Вход',
  headerTintColor: '#fff',
  headerStyle: commonHeaderOptions,
  headerTitleStyle: {
    fontSize: rem(20),
  },
};
export const addPostOptions = {
  title: 'Добавить пост',
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#2e64e515',
    shadowColor: '#2e64e515',
    elevation: 0,
  },
  headerTitleStyle: {
    fontSize: rem(22),
  },
  headerBackTitleVisible: false,
};
export const profileOptions = {
  title: '',
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#fff',
    shadowColor: '#fff',
    elevation: 0,
  },
  headerBackTitleVisible: false,
};
export const editProfileOptions = {
  headerTitle: 'Редактировать профиль',
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerStyle: {
    height: vrem(60),
    shadowColor: '#fff',
    elevation: 0,
  },
  headerTitleStyle: {
    fontSize: rem(22),
  },
};
export const artworkDetailOptions = {
  title: '',
  headerTintColor: '#fff',
  headerStyle: {...commonHeaderOptions, backgroundColor: '#4f016d'},
  headerTitleStyle: {
    fontSize: rem(20),
  },
};
export const bottomTabBarOptions = {
  labelStyle: {
    fontSize: rem(12),
    lineHeight: rem(14),
    marginBottom: rem(4),
    letterSpacing: -0.33,
  },
  activeTintColor: '#ffffff',
  inactiveTintColor: '#818181',
  activeBackgroundColor: '#4f016d',
  inactiveBackgroundColor: '#4f016d',
};
export const withoutHeader = () => ({headerShown: false});
