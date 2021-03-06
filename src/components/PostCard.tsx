import React, {useEffect, useState} from 'react';
import {rem} from '../consts/size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCommentsSelector,
  getUserSelector,
  isCommentVisibleSelector,
} from '../store/selectors';
import moment from 'moment';
import firebase from 'firebase';
import {CommentInput} from './CommentInput';
import {Comment} from './Comment';
import {setCommentMenuVisible} from '../store/actions/feedActions';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {CommentType} from '../types/types';

export const PostCard: React.FC<any> = ({item, onDelete, onPress}) => {
  const dispatch = useDispatch();
  const comments = useSelector(getCommentsSelector);
  const user: FirebaseAuthTypes.User | null = useSelector(getUserSelector);
  const isCommentVisibleMenu = useSelector(isCommentVisibleSelector);

  const userUID = user && user.uid;

  let [likes, setLikes] = useState<(string | null)[]>([]);

  useEffect(() => {
    if (item.likes) {
      setLikes(Object.keys(item.likes));
    }
  }, []);

  const likeToggled = () => {
    const isLiked = likes.includes(userUID);
    if (isLiked) {
      firebase
        .database()
        .ref(`usersPost/${item.id}/likes/${userUID}`)
        .remove()
        .then(() => {
          setLikes(likes.filter((likeId: string | null) => likeId !== userUID));
        });
    } else {
      firebase
        .database()
        .ref(`usersPost/${item.id}/likes/${userUID}`)
        .set({
          isLike: true,
        })
        .then(() => {
          setLikes([...likes, userUID]);
        });
    }
  };

  const commentHandler = () => {
    dispatch(setCommentMenuVisible(!isCommentVisibleMenu));
  };

  const deletePostHandler = () => onDelete(item.id);

  const isPostLiked =
    likes && likes.find((userId: string | null) => user && userId === user.uid);

  const likeIcon = isPostLiked ? 'heart' : 'heart-outline';

  const likeIconColor = isPostLiked ? '#2e64e5' : '#333';

  const commentsFromUsersId: any[] = [];

  comments.forEach((comment: any) => {
    for (let value in comment) {
      if (item.id === comment[value]) {
        commentsFromUsersId.push(item.id);
      }
    }
  });

  return (
    <View style={styles.card} key={item.id}>
      <View style={styles.userInfo}>
        <Image style={styles.userImage} source={{uri: item.userImage}} />
        <View style={styles.userInfoText}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.userName}>
              {`${item.firstName || '?????? ??????????'} ${
                (item.firstName && item.lastName) || ''
              }`}
            </Text>
          </TouchableOpacity>
          <Text style={styles.postTime}>{moment(item.postTime).fromNow()}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{item.post}</Text>
      {item.postImg ? (
        <Image style={styles.postImg} source={{uri: item.postImg}} />
      ) : (
        <View style={styles.divider} />
      )}
      <View style={styles.interactionWrapper}>
        <TouchableOpacity onPress={likeToggled}>
          <View style={styles.interactionHeart}>
            <Ionicons name={likeIcon} size={24} color={likeIconColor} />
          </View>
        </TouchableOpacity>
        <Text style={styles.interactionText}>{likes.length}</Text>
        <TouchableOpacity onPress={commentHandler}>
          <View style={styles.interactionComment}>
            <EvilIcons name="comment" size={30} color="#000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.interactionText}>{commentsFromUsersId.length}</Text>
        {userUID === item.userId && (
          <TouchableOpacity onPress={deletePostHandler}>
            <View style={styles.interactionHeart}>
              <Ionicons name="trash-bin-outline" size={24} color="#000" />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {isCommentVisibleMenu && (
        <View>
          <CommentInput item={item} />
          {comments &&
            comments.map((comment: CommentType) => {
              if (item.id === comment.postId) {
                return (
                  <Comment
                    key={comment.createdAt}
                    userImage={comment.userImage}
                    userName={comment.userName}
                    createdAt={comment.createdAt}
                    comment={comment.comment}
                  />
                );
              }
            })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    marginBottom: rem(15),
    borderRadius: rem(15),
    width: rem(360),
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: rem(15),
  },
  userImage: {
    width: rem(50),
    height: rem(50),
    borderRadius: rem(30),
  },
  userInfoText: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: rem(10),
  },
  userName: {
    fontSize: rem(14),
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: rem(12),
    color: '#666',
  },
  postText: {
    fontSize: rem(14),
    paddingHorizontal: rem(15),
  },
  postImg: {
    width: '100%',
    height: 250,
    marginTop: rem(14),
  },
  divider: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    width: '93%',
    alignSelf: 'center',
    marginTop: rem(10),
  },
  interactionWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: rem(10),
  },
  interactionHeart: {
    padding: rem(5),
    color: '#333',
    marginTop: rem(5),
  },
  interactionComment: {
    padding: rem(5),
    color: '#333',
    marginTop: rem(5),
  },
  interactionText: {
    marginTop: rem(10),
    fontSize: rem(18),
    marginRight: rem(8),
  },
  statusLoadingWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
