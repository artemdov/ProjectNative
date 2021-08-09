import {rem} from '../consts/size';

export const myOptions = {
  title: 'Вход',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#0c0c30',
    height: 50,
  },
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
export const addPostOptions = {
  title: 'Добавить пост',
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#2e64e515',
    shadowColor: '#2e64e515',
    elevation: 0,
  },
  headerBackTitleVisible: false,
};

export const withoutHeader = () => ({headerShown: false});
