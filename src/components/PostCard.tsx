import React, {useEffect, useState} from 'react';
import {height as h, width as w} from '../consts/size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {
  Card,
  Divider,
  Interaction,
  InteractionComment,
  InteractionHeart,
  InteractionText,
  InteractionWrapper,
  PostImg,
  PostText,
  PostTime,
  UserImg,
  UserInfo,
  UserInfoText,
  UserName,
} from '../styles/FeedStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserSelector,
  setCommentSelector,
  viewCommentMenuSelector,
} from '../store/selectors';
import moment from 'moment';
import firebase from 'firebase';
import {CommentInput} from './CommentInput';
import {Comment} from './Comment';
import {setComments, viewCommentMenu} from '../store/actions/feedAction';
import {View} from 'react-native';

export const PostCard: React.FC<any> = ({item, onDelete}) => {
  let [likes, setLikes] = useState<any>([]);
  const dispatch = useDispatch();
  const comments = useSelector(setCommentSelector);
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
        } else {
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
  //comments массив объектов, forEach я достаю каждый объект и for in я перебираю значения именно айдишники комментов, а не другие значения.
  // Это показывает количество комментариев к определенному посту
  console.log('likes', likes.length);
  console.log('likes', likes);

  return (
    <Card style={{width: w - 40}}>
      <UserInfo>
        <UserImg source={{uri: item.usersImg}} />
        <UserInfoText>
          <UserName>{item.usersName}</UserName>
          <PostTime>{moment(item.postTime).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg ? (
        <PostImg source={{uri: item.postImg}} />
      ) : (
        <Divider style={{marginTop: h / 55}} />
      )}
      <InteractionWrapper>
        <Interaction onPress={toggleHandler}>
          <InteractionHeart>
            <Ionicons name={likeIcon} size={24} color={likeIconColor} />
          </InteractionHeart>
        </Interaction>
        <InteractionText>{likes.length}</InteractionText>
        <Interaction onPress={commentHandler}>
          <InteractionComment>
            <EvilIcons name="comment" size={30} color="#000" />
          </InteractionComment>
        </Interaction>
        <InteractionText>{commentCount.length}</InteractionText>
        {user.uid && user.uid === item.userId && (
          <Interaction onPress={deletePostHandler}>
            <InteractionHeart>
              <Ionicons name="trash-bin-outline" size={24} color="#000" />
            </InteractionHeart>
          </Interaction>
        )}
      </InteractionWrapper>
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
    </Card>
  );
};
