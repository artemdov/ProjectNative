import React, {useEffect, useState} from 'react';
import {height as h, width as w} from '../consts/size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserSelector,
  getCommentSelector,
  viewCommentMenuSelector,
} from '../store/selectors';
import moment from 'moment';
import firebase from 'firebase';
import {CommentInput} from './CommentInput';
import {Comment} from './Comment';
import {setComments, viewCommentMenu} from '../store/actions/feedAction';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';

export const PostCard: React.FC<any> = ({item, onDelete}) => {
  let [likes, setLikes] = useState<any>([]);
  const dispatch = useDispatch();
  const comments = useSelector(getCommentSelector);
  const user: any = useSelector(getUserSelector);
  const commentMenu = useSelector(viewCommentMenuSelector);

  const fetchComments = () => {
    const usersPostRef = firebase.database().ref('comments/');
    const onLoadingFeed = usersPostRef.on('value', snapshot => {
      const commentsMap: any = [];
      snapshot.forEach(childSnapshot => {
        const {comment, createdAt, postId, userId} = childSnapshot.val();
        commentsMap.push({
          comment,
          createdAt,
          postId,
          userId,
          usersName: 'Имя',
          usersImg:
            'https://lh5.googleusercontent.com/' +
            '-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/' +
            'AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
        });
      });
      dispatch(setComments(commentsMap));
    });
    return () => {
      usersPostRef.off('value', onLoadingFeed);
    };
  };
  useEffect(() => {
    fetchComments();
  }, []);
  useEffect(() => {
    changePostLikes();
  }, [item.likes]);
  const changePostLikes = () => {
    if (item.likes) {
      setLikes(Object.keys(item.likes));
    } else {
      setLikes([]);
    }
  };

  const likeToggled = () => {
    if (!item.likes) {
      firebase
        .database()
        .ref(`usersPost/${item.id}/likes/${user.uid}`)
        .set({
          isLike: true,
        })
        .then(() => {});
    } else {
      likes.forEach(async (likeKey: string) => {
        if (likeKey === `${user.uid}`) {
          await firebase
            .database()
            .ref(`usersPost/${item.id}/likes/${user.uid}`)
            .remove()
            .then(() => {});
          return;
        }
        if (likeKey !== `${user.uid}`) {
          await firebase
            .database()
            .ref(`usersPost/${item.id}/likes/${user.uid}`)
            .set({
              isLike: true,
            });
        }
      });
    }
  };
  const toggleHandler = () => {
    likeToggled();
  };
  const commentHandler = () => {
    dispatch(viewCommentMenu(!commentMenu));
  };
  const deletePostHandler = () => onDelete(item.id);
  const isPostLiked =
    likes && likes.find((userId: string) => userId === user.uid);
  const likeIcon = isPostLiked ? 'heart' : 'heart-outline';
  const likeIconColor = isPostLiked ? '#2e64e5' : '#333';
  const commentCount = [];
  comments.forEach((comment: any) => {
    for (let value in comment) {
      if (item.id === comment[value]) {
        commentCount.push(item.id);
      }
    }
  });
  //comments массив объектов, forEach я достаю каждый объект, for in я перебираю значения и item.id проверяю что именно айдишники комментов, а не другие значения.
  // Это показывает количество комментариев к определенному посту
  return (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Image style={styles.userImg} source={{uri: item.usersImg}} />
        <View style={styles.userInfoText}>
          <Text style={styles.userName}>{item.usersName}</Text>
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
        <TouchableOpacity onPress={toggleHandler}>
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
        <Text style={styles.interactionText}>{commentCount.length}</Text>
        {user.uid && user.uid === item.userId && (
          <TouchableOpacity onPress={deletePostHandler}>
            <View style={styles.interactionHeart}>
              <Ionicons name="trash-bin-outline" size={24} color="#000" />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {commentMenu && (
        <View>
          <CommentInput item={item} />
          {comments &&
            comments.map((comment: any) => {
              if (item.id === comment.postId) {
                return (
                  <Comment
                    key={comment.createdAt}
                    usersImg={comment.usersImg}
                    usersName={comment.usersName}
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
    marginBottom: 20,
    borderRadius: 10,
    width: w - 40,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
  },

  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  userInfoText: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },

  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  postTime: {
    fontSize: 12,
    color: '#666',
  },
  postText: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
  },
  postImg: {
    width: '100%',
    height: 250,
    marginTop: 15,
  },
  divider: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    width: '93%',
    alignSelf: 'center',
    marginTop: h / 55,
  },
  interactionWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
  },
  interactionHeart: {
    padding: 5,
    color: '#333',
    marginTop: 5,
  },

  interactionComment: {
    padding: 5,
    color: '#333',
    marginTop: 5,
  },
  interactionText: {
    marginTop: 10,
    fontSize: 18,
    marginRight: 8,
  },
  statusLoadingWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
