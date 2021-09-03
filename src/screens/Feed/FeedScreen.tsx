import React, {useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {rem} from '../../consts/size';
import {PostCard} from '../../components/PostCard';
import screenNames from '../../navigation/ScreenNames';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {useDispatch, useSelector} from 'react-redux';
import {
  isLoadingPostSelector,
  getPostsSelector,
  getUserSelector,
} from '../../store/selectors';
import {setIsLoadingPost, setPosts} from '../../store/actions/feedAction';
import storage from '@react-native-firebase/storage';
import {setIsLoadingUserPost} from "../../store/actions/profileUserAction";
import {setOtherUserInfo, setOtherUserPosts} from "../../store/actions/otherProfileUserAction";

export const FeedScreen: React.FC<any> = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoadingPost = useSelector(isLoadingPostSelector);
  const posts: any = useSelector(getPostsSelector);
  const user: any = useSelector(getUserSelector);

  const onPressAddPost = () => navigation.navigate(screenNames.ADD_POST_SCREEN);

  const fetch = () => {
    dispatch(setIsLoadingPost(true));
    const postsRef = firebase.database().ref('usersPost');
    const onLoadingFeed = postsRef.on('value', snapshot => {
      const listData: any = [];
      snapshot.forEach(childSnapshot => {
        const {id, userId, post, postImg, postTime, likes, userImage} =
          childSnapshot.val();
        listData.push({
          id,
          userId,
          userImage,
          postTime,
          post,
          postImg,
          likes,
        });
      });
      dispatch(setPosts(listData));
      dispatch(setIsLoadingPost(false));
    });
    return () => {
      postsRef.off('value', onLoadingFeed);
    };
  };

  useEffect(() => {
    fetch();
  }, []);

  const keyExtractor = (item: {id: string}) => item.id;

  const renderItem = ({item}: any) => (
    <PostCard
      item={item}
      onDelete={handleDelete}
      onPress={() => {
        const fetchUserPosts = () => {
          dispatch(setIsLoadingUserPost(true));
          const postsRef = firebase.database().ref('usersPost');
          const onLoadingFeed = postsRef.on('value', snapshot => {
            const listData: any = [];
            snapshot.forEach(childSnapshot => {
              const userId = childSnapshot.val().userId;
              if (userId === item.userId) {
                const {id, userId, post, postImg, postTime, likes, userImage} =
                    childSnapshot.val();
                listData.push({
                  id,
                  userId,
                  userImage,
                  postTime,
                  post,
                  postImg,
                  likes,
                });
              }
            });
            dispatch(setOtherUserPosts(listData));
            dispatch(setIsLoadingUserPost(false));
          });
          return () => {
            postsRef.off('value', onLoadingFeed);
          };
        };

        const getUser = async () => {
          await firebase
              .database()
              .ref(`users/${item.userId}`)
              .on('value', snapshot => {
                if (snapshot.exists()) {
                  dispatch(setOtherUserInfo(snapshot.val()));
                }
              });
        };
        {
          user.uid === item.userId
              ? navigation.navigate(screenNames.PROFILE_SCREEN)
              :
        getUser().then(() => console.log('user success'));
        fetchUserPosts();
        navigation.navigate(screenNames.OTHER_PROFILE_SCREEN);
      }
      }}
    />
  );

  const handleDelete = (postId: string) => {
    Alert.alert(
      'Удалить пост',
      'Вы уверены?',
      [
        {
          text: 'Отмена',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => deletePost(postId),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = (postId: string) => {
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
                deleteFirebaseData(postId);
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            deleteFirebaseData(postId);
          }
        }
      });
    const deleteFirebaseData = (postId: string) => {
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.buttonAddPost} onPress={onPressAddPost}>
        <Ionicons name="add-circle" size={rem(45)} color="#2e64e5" />
      </TouchableOpacity>
      {isLoadingPost ? (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  buttonAddPost: {
    margin: rem(3),
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
