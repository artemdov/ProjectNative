import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem, vrem} from '../../consts/size';
import {
  getOtherUserInfoSelector,
  getOtherUserPostsSelector,
  isLoadingUserPostSelector,
} from '../../store/selectors';
import firebase from 'firebase';
import {PostCard} from '../../components/PostCard';
import {setIsLoadingUserPost} from '../../store/actions/profileUserAction';
import {photoUserProfile} from '../../utils/helpers';
import {
  setOtherUserInfo,
  setOtherUserPosts,
} from '../../store/actions/otherProfileUserAction';

export const OtherProfileScreen: React.FC<any> = ({route}) => {
  const otherUserPosts: any = useSelector(getOtherUserPostsSelector);
  const otherUserInfo: any = useSelector(getOtherUserInfoSelector);
  const isLoadingUserPost = useSelector(isLoadingUserPostSelector);
  const dispatch = useDispatch();

  const userImageURL =
    (otherUserInfo && otherUserInfo.userImage) || photoUserProfile;

  const userFirstName = otherUserInfo && otherUserInfo.firstName;

  const userLastName = otherUserInfo && otherUserInfo.lastName;

  const fetchUserPosts = () => {
    dispatch(setIsLoadingUserPost(true));
    const postsRef = firebase.database().ref('usersPost');
    const onLoadingFeed = postsRef.on('value', snapshot => {
      const listData: any = [];
      snapshot.forEach(childSnapshot => {
        const userId = childSnapshot.val().userId;
        if (route.params && userId === route.params.userId) {
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
      .ref(`users/${route.params && route.params.userId}`)
      .on('value', snapshot => {
        if (snapshot.exists()) {
          dispatch(setOtherUserInfo(snapshot.val()));
        }
      });
  };

  useEffect(() => {
    getUser().then(() => console.log('user success'));
    fetchUserPosts();
  }, []);

  return (
    <SafeAreaView style={styles.profileContainer}>
      {isLoadingUserPost ? (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.profileContent}
          showsVerticalScrollIndicator={false}>
          <Image style={styles.userImage} source={{uri: userImageURL}} />
          <Text style={styles.userName}>
            {`${userFirstName || 'Без имени'} ${
              (userFirstName && userLastName) || ''
            }`}
          </Text>
          {otherUserPosts.map((item: any) => (
            <PostCard key={item.id} item={item} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContent: {
    marginBottom: vrem(14),
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
