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
    getOtherUserInfoSelector, getOtherUserPostsSelector,
    getUserPostsSelector,
    getUserSelector,
    isLoadingPostSelector
} from "../../store/selectors";
import {setIsLoadingPost} from "../../store/actions/feedAction";
import firebase from "firebase";
import {PostCard} from "../../components/PostCard";
import {setOtherUserInfo, setUserInfo, setOtherUserPosts} from "../../store/actions/profileUserAction";
import {photoUserProfile} from "../../utils/helpers";
import {CustomProfileButton} from "../../components/common/CustomProfileButton";
import storage from "@react-native-firebase/storage";

export const OtherProfileScreen: React.FC<any> = ({navigation, route}) => {
    const otherUserPosts: any = useSelector(getOtherUserPostsSelector);
    const isLoadingUserPost = useSelector(isLoadingPostSelector);
    const dispatch = useDispatch();
    //const [loading, setLoading] = useState(true);
    const otherUserInfo: any = useSelector(getOtherUserInfoSelector)
    const userImageURL = otherUserInfo && otherUserInfo.userImage || photoUserProfile;
    const userFirstName = otherUserInfo && otherUserInfo.firstName;
    const userLastName = otherUserInfo && otherUserInfo.lastName
//    console.log('otheruserInfo', otherUserInfo)
   // console.log('otherUserPosts', otherUserPosts)
     //console.log('data', userPosts)

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

    const fetchOtherUserPosts = () => {
        dispatch(setIsLoadingPost(true));
        const postsRef = firebase.database().ref('userPosts')
        const onLoadingFeed = postsRef.on('value', snapshot => {
            const listData: any = [];
            snapshot.forEach(childSnapshot => {
                const userId = childSnapshot.val().userId
                if (route.params && userId === route.params.userId) {
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
                }
            });
            dispatch(setOtherUserPosts(listData));
            dispatch(setIsLoadingPost(false));
        });
        return () => {
            postsRef.off('value', onLoadingFeed);
        };
    };


    useEffect(() => {
        fetchOtherUserPosts();
        getUser().then(() => console.log('user success'));
    }, []);

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
                    otherUserPosts.map((item: any) => (
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
