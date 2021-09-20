import React, {useCallback, useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {
  isLoadingPostSelector,
  getPostsSelector,
  getUserSelector,
} from '../../store/selectors';
import {setAllUserPostsFromFirebase} from '../../store/actions/userProfileActions';
import {
  setOtherUserInfoFromFirebase,
  setOtherUserPostsFromFirebase,
} from '../../store/actions/otherUserProfileActions';
import {PostType} from '../../types/types';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {deletePostFromFirebase} from '../../store/actions/feedActions';

export const FeedScreen: React.FC<any> = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoadingPost = useSelector(isLoadingPostSelector);
  const posts: PostType[] = useSelector(getPostsSelector);
  const user: FirebaseAuthTypes.User | null = useSelector(getUserSelector);
  const userUID = user && user.uid;

  const onPressAddPost = () => navigation.navigate(screenNames.ADD_POST_SCREEN);

  const fetch = useCallback(() => {
    dispatch(setAllUserPostsFromFirebase());
  }, [dispatch]);

  useEffect(() => {
    fetch();
  }, []);

  const fetchUserPosts = useCallback(
    (item: PostType) => {
      dispatch(setOtherUserPostsFromFirebase(item.userId));
    },
    [dispatch],
  );

  const getUser = useCallback(
    (item: PostType) => {
      dispatch(setOtherUserInfoFromFirebase(item.userId));
    },
    [dispatch],
  );

  const keyExtractor = (item: {id: string}) => item.id;

  const onPressPostCard = async (item: PostType) => {
    await getUser(item);
    await fetchUserPosts(item);
    navigation.navigate(
      userUID === item.userId
        ? screenNames.PROFILE_SCREEN
        : screenNames.OTHER_PROFILE_SCREEN,
    );
  };

  const renderItem: ({item}: {item: PostType}) => JSX.Element = ({item}) => (
    <PostCard
      item={item}
      onDelete={handleDelete}
      onPress={() => onPressPostCard(item)}
    />
  );

  const handleDelete = (postId: string) => {
    Alert.alert(
      'Удалить пост',
      'Вы уверены?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => dispatch(deletePostFromFirebase(postId)),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
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
