import {AppRootStateType} from '../types/types';
import {useSelector} from 'react-redux';

export const isLoggedIn = useSelector<AppRootStateType, boolean>(
  state => state.auth.isLoggedIn,
);
