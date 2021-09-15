import actionTypes from '../actionTypes';
import {CommentType, PostType} from '../../types/types';
import {Dispatch} from 'redux';
import firebase from 'firebase';

export const setPosts = (posts: PostType[]) =>
  ({
    type: actionTypes.feed.SET_POSTS,
    payload: posts,
  } as const);
export const setComments = (comments: CommentType[]) =>
  ({
    type: actionTypes.feed.SET_COMMENTS,
    payload: comments,
  } as const);

export const setImage = (image?: string) =>
  ({
    type: actionTypes.feed.SET_IMAGE,
    payload: image,
  } as const);

export const setCommentMenuVisible = (isCommentMenuVisible: boolean) =>
  ({
    type: actionTypes.feed.SET_IS_COMMENT_MENU_VISIBLE,
    payload: isCommentMenuVisible,
  } as const);

export const setIsLoadingPost = (isLoadingPost: boolean) =>
  ({
    type: actionTypes.feed.SET_IS_LOADING_POST,
    payload: isLoadingPost,
  } as const);

export const setUserCommentsFromFirebase = () => async (dispatch: Dispatch) => {
  try {
    await firebase
      .database()
      .ref('comments/')
      .on('value', snapshot => {
        const commentsMap: any[] = [];
        snapshot.forEach(childSnapshot => {
          const {comment, createdAt, postId, userId, userName, userImage} =
            childSnapshot.val();
          commentsMap.push({
            comment,
            createdAt,
            postId,
            userId,
            userName,
            userImage,
          });
        });
        dispatch(setComments(commentsMap));
      });
  }
  catch (error) {
    console.log(error);
  }
};
