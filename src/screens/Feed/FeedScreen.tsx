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
import {isLoadingPostSelector, getPostsSelector, getOtherUserInfoSelector} from '../../store/selectors';
import {setIsLoadingPost, setPosts} from '../../store/actions/feedAction';
import storage from '@react-native-firebase/storage';
import {setOtherUserInfo, setOtherUserPosts} from "../../store/actions/profileUserAction";

export const FeedScreen: React.FC<any> = ({navigation, route}) => {
  const dispatch = useDispatch();
  const isLoadingPost = useSelector(isLoadingPostSelector);
  const data: any = useSelector(getPostsSelector);
  //const postInfo: any = useSelector(getPostInfoSelector)
  //console.log('data', data)
  //console.log('routes', route.params)


  const onPressAddPost = () => navigation.navigate(screenNames.ADD_POST_SCREEN);

  const fetchPosts = () => {
    dispatch(setIsLoadingPost(true));
    const postsRef = firebase.database().ref('userPosts');
    const onLoadingFeed = postsRef.on('value', snapshot => {
      const listData: any = [];
      snapshot.forEach(childSnapshot => {
        console.log('childSnapshot', childSnapshot.val())
        const {id, userId, post, firstName, lastName, userImage, postImg, postTime, comments, likes} =
          childSnapshot.val();
        listData.push({
          userId,
          id,
          userImage,
          firstName,
          lastName,
          postTime,
          post,
          postImg,
          comments,
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
    fetchPosts();
  }, []);

  const keyExtractor = (item: {id: string}) => item.id;

  const renderItem = ({item}: any) => (
      <PostCard item={item}
                onDelete={handleDelete}
                onPress={ () => {
                    /*await firebase
                        .database()
                        .ref(`userPosts/${item.id}`)
                        .on('value', snapshot => {
                          if (snapshot.exists()) {
                            //console.log('snapshot', snapshot.val())
                            //dispatch(setOtherUserPosts(snapshot.val()))
                          }
                        })*/
                  navigation.navigate(screenNames.OTHER_PROFILE_SCREEN, {userId: item.userId})}}
    />
  );

  const handleDelete = (postId: string) => {
    Alert.alert(
      'Удалить пост',
      'Вы уверены?',
      [
        {
          text: 'Отмена',
          onPress: () => console.log('Cancel pressed'),
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
          data={data}
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
