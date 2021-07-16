const actionTypes = {
  auth: {
    SET_USER: 'SET_USER',
    SET_ERROR: 'SET_ERROR',
    SET_LOADING: 'SET_LOADING',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SIGNUP: 'SIGNUP',
    IS_AUTHENTICATED: 'IS_AUTHENTICATED',
  },
  feed: {
    CHANGE_VALUE_POST: 'CHANGE_VALUE_POST',
    SET_IMAGE: 'SET_IMAGE',
    UPLOAD: 'UPLOAD',
    SET_TRANSFERRED: 'SET_TRANSFERRED'
  }
};

export default actionTypes;
