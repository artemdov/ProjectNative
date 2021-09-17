import actionTypes from '../actionTypes';
import {CommentType, PostType} from '../../types/types';
import {Dispatch} from 'redux';
import firebase from 'firebase';
import {Alert} from 'react-native';
import storage from '@react-native-firebase/storage';

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

const deleteFirebaseData: any = (postId: string) => {
  firebase
    .database()
    .ref(`usersPost/${postId}`)
    .remove()
    .then(() => {
      Alert.alert('Пост удален', 'Ваш пост удален успешно!');
    })
    .catch(err => {
      console.log(err);
    });
};

export const deletePostFromFirebase =
  (postId: string) => (dispatch: Dispatch) => {
    firebase
      .database()
      .ref(`usersPost/${postId}`)
      .get()
      .then(snapshot => {
        if (snapshot.exists()) {
          const {postImg} = snapshot.val();
          if (postImg) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);
            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} успешно удалена!`);
                dispatch(deleteFirebaseData(postId));
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            dispatch(deleteFirebaseData(postId));
          }
        }
      });
  };
