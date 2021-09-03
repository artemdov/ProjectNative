import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import {rem, vrem} from '../../consts/size';
import {
  getOtherUserInfoSelector,
  getOtherUserPostsSelector,
  isLoadingUserPostSelector,
} from '../../store/selectors';
import {PostCard} from '../../components/PostCard';
import {photoUserProfile} from "../../consts/photoUserProfile";

export const OtherProfileScreen: React.FC<any> = () => {
  const otherUserPosts: any = useSelector(getOtherUserPostsSelector);
  const otherUserInfo: any = useSelector(getOtherUserInfoSelector);
  const isLoadingUserPost = useSelector(isLoadingUserPostSelector);
  console.log('otherUserPosts', otherUserPosts)
  console.log('otherUserInfo', otherUserInfo)

  const userImageURL = (otherUserInfo && otherUserInfo.userImage) || photoUserProfile;

  const userFirstName = otherUserInfo && otherUserInfo.firstName;

  const userLastName = otherUserInfo && otherUserInfo.lastName;

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
