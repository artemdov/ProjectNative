import React, {useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  View,
} from 'react-native';
import {width as w} from '../../consts/size';
import {PostCard} from '../../components/PostCard';
import screenNames from '../../navigation/ScreenNames';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {useDispatch, useSelector} from 'react-redux';
import {isLoadingPostSelector, getPostsSelector} from '../../store/selectors';
import {setIsLoadingPost, setPosts} from '../../store/actions/feedAction';
import storage from '@react-native-firebase/storage';

export const FeedScreen: React.FC<any> = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoadingPost = useSelector(isLoadingPostSelector);
  const data: any = useSelector(getPostsSelector);

  const onPressAddPost = () => navigation.navigate(screenNames.ADD_POST_SCREEN);

  const fetch = () => {
    dispatch(setIsLoadingPost(true));
    const postsRef = firebase.database().ref('usersPost');
    const onLoadingFeed = postsRef.on('value', snapshot => {
      const listData: any = [];
      snapshot.forEach(childSnapshot => {
        const {id, userId, post, postImg, postTime, likes, userName} =
          childSnapshot.val();
        listData.push({
          id,
          userId,
          userName,
          userImage:
            'https://lh5.googleusercontent.com/' +
            '-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/' +
            'AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
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
    <PostCard item={item} onDelete={handleDelete} />
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonAddPost} onPress={onPressAddPost}>
        <Ionicons name="add-circle" size={45} color="#2e64e5" />
      </TouchableOpacity>
      {isLoadingPost ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  buttonAddPost: {
    margin: 5,
    marginLeft: w / 1.2,
  },
});
