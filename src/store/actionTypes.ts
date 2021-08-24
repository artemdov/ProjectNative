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
    SET_UPLOADING: 'SET_UPLOADING',
    SET_TRANSFERRED: 'SET_TRANSFERRED',
    SET_POSTS: 'SET_POSTS',
    SET_IS_LOADING_POST: 'SET_IS_LOADING_POST',
    SET_COMMENTS: 'SET_COMMENTS',
    SET_IS_COMMENT_MENU_VISIBLE: 'SET_IS_COMMENT_MENU_VISIBLE',
  },
  artworks: {
    SET_ARTWORKS: 'SET_ARTWORKS',
    SET_IS_LOADING_ARTWORKS: 'SET_IS_LOADING_ARTWORKS',
  },
  editUser: {
    SET_USER_INFO: 'SET_USER_INFO',
    SET_UPLOADING_USER_IMAGE: 'SET_UPLOADING_USER_IMAGE',
    SET_TRANSFERRED_IMAGE: 'SET_TRANSFERRED_IMAGE',
    SET_USER_IMAGE: 'SET_USER_IMAGE',
    SET_USER_POSTS: 'SET_USER_POSTS',

  }
};

export default actionTypes;
