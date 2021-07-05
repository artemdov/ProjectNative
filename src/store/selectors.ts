import {AppRootStateType} from '../types/types';


export const isLoggedInSelector = (state: AppRootStateType) => state.auth.isLoggedIn

