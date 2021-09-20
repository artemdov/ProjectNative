import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {onSubmitLogOut} from '../../store/actions/authActions';
import screenNames from '../../navigation/ScreenNames';
import {rem, vrem} from '../../consts/size';
import {
  getUserInfoSelector,
  getUserPostsSelector,
  isLoadingUserPostSelector,
} from '../../store/selectors';
import {PostCard} from '../../components/PostCard';
import {CustomProfileButton} from '../../components/common/CustomProfileButton';
import {userImagePlaceholder} from '../../consts/userImagePlaceholder';
import {PostType, UserInfoType} from '../../types/types';
import {deletePostFromFirebase} from '../../store/actions/feedActions';

export const ProfileScreen: React.FC<any> = ({navigation}) => {
  const userPosts: PostType[] = useSelector(getUserPostsSelector);
  const userInfo: UserInfoType | null = useSelector(getUserInfoSelector);
  const isLoadingUserPost = useSelector(isLoadingUserPostSelector);
  const dispatch = useDispatch();

  const imageURL = (userInfo && userInfo.userImage) || userImagePlaceholder;

  const userFirstName = userInfo && userInfo.firstName;

  const userLastName = userInfo && userInfo.lastName;

  const handleDelete = (postId: string) => {
    Alert.alert(
      'Удалить этот пост',
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

  const onPressLogout = () => {
    dispatch(onSubmitLogOut());
    navigation.navigate(screenNames.LANDING_SCREEN);
  };

  const onPressEditProfile = () => {
    navigation.navigate(screenNames.EDIT_PROFILE_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoadingUserPost ? (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <Image style={styles.userImage} source={{uri: imageURL}} />
          <Text style={styles.userName}>
            {`${userFirstName || 'Без имени'} ${
              (userFirstName && userLastName) || ''
            }`}
          </Text>
          <View style={styles.userButtonWrapper}>
            <CustomProfileButton
              title="Редактировать профиль"
              onPress={onPressEditProfile}
            />
            <CustomProfileButton title="Выйти" onPress={onPressLogout} />
          </View>
          {userPosts.map((item: PostType) => (
            <PostCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    marginBottom: vrem(15),
    borderRadius: rem(15),
    width: rem(375),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    width: rem(175),
    height: vrem(220),
    backgroundColor: '#666',
    borderRadius: rem(90),
    marginTop: vrem(4),
  },
  userName: {
    fontSize: rem(18),
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginVertical: vrem(13),
  },
  button: {
    borderColor: '#2e64e5',
    borderWidth: rem(2),
    borderRadius: rem(3),
    paddingVertical: vrem(8),
    paddingHorizontal: rem(12),
    marginHorizontal: rem(5),
  },
  userButtonText: {
    color: '#2e64e5',
  },
});
