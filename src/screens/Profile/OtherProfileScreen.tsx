import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator, Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {onSubmitLogOut} from '../../store/actions/authAction';
import screenNames from '../../navigation/ScreenNames';
import {rem, vrem} from '../../consts/size';
import {
    getOtherUserInfoSelector,
    getUserInfoSelector,
    getUserPostsSelector,
    getUserSelector,
    isLoadingPostSelector
} from "../../store/selectors";
import {setIsLoadingPost} from "../../store/actions/feedAction";
import firebase from "firebase";
import {PostCard} from "../../components/PostCard";
import {setOtherUserInfo, setUserInfo, setUserPosts} from "../../store/actions/profileUserAction";
import {photoUserProfile} from "../../utils/helpers";
import {CustomProfileButton} from "../../components/common/CustomProfileButton";
import storage from "@react-native-firebase/storage";

export const OtherProfileScreen: React.FC<any> = ({navigation, route}) => {
    const data: any = useSelector(getUserPostsSelector);
    const otherUserInfo: any = useSelector(getOtherUserInfoSelector)
    const isLoadingUserPost = useSelector(isLoadingPostSelector);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const userImageURL = otherUserInfo && otherUserInfo.userImage || photoUserProfile;
    const userFirstName = otherUserInfo && otherUserInfo.firstName;
    const userLastName = otherUserInfo && otherUserInfo.lastName


    const fetchUserPosts = () => {
        dispatch(setIsLoadingPost(true));
        const postsRef = firebase.database().ref('usersPost')
        const onLoadingFeed = postsRef.on('value', snapshot => {
            const listData: any = [];
            snapshot.forEach(childSnapshot => {
                const userId = childSnapshot.val().userId
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
                    })
                }
            });
            dispatch(setUserPosts(listData));
            dispatch(setIsLoadingPost(false));
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
                    dispatch(setOtherUserInfo(snapshot.val()))
                }
            })
    }

    useEffect(() => {
        getUser().then(() => console.log('user success'));
        fetchUserPosts();
        navigation.addListener("focus", () => setLoading(!loading));
    }, [navigation, loading]);

    return (
        <SafeAreaView style={styles.profileContainer}>
            {isLoadingUserPost ? (
                <ActivityIndicator style={styles.loader} size="large" color="#0000ff"/>
            ) : (<ScrollView contentContainerStyle={styles.profileContent}
                             showsVerticalScrollIndicator={false}>
                <Image style={styles.userImage}
                       source={{uri: userImageURL}}/>
                <Text style={styles.userName}>{`${userFirstName || 'Без имени'} ${userFirstName && userLastName || ''}`}
                </Text>
                {
                    data.map((item: any) => (
                        <PostCard key={item.id}
                                  item={item}
                        />)
                    )
                }
            </ScrollView>)}
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
