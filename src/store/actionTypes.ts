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
    SET_IMAGE: 'SET_IMAGE',
    UPLOAD: 'UPLOAD',
    SET_TRANSFERRED: 'SET_TRANSFERRED',
    SET_POST_DATA: 'SET_POST_DATA',
    IS_LOAD_POST: 'IS_LOAD_POST',

  }
};

export default actionTypes;
