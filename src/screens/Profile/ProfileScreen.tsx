import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator, Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {onSubmitLogOut} from '../../store/actions/authAction';
import screenNames from '../../navigation/ScreenNames';
import {rem, vrem} from '../../consts/size';
import {getUserInfoSelector, getUserPostsSelector, getUserSelector, isLoadingPostSelector} from "../../store/selectors";
import {setIsLoadingPost} from "../../store/actions/feedAction";
import firebase from "firebase";
import {PostCard} from "../../components/PostCard";
import {setUserInfo, setUserPosts} from "../../store/actions/editUserAction";
import {photoUserProfile} from "../../utils/helpers";
import {CustomProfileButton} from "../../components/common/CustomProfileButton";

export const ProfileScreen: React.FC<any> = ({navigation, route}) => {
    const data: any = useSelector(getUserPostsSelector);
    const user: any = useSelector(getUserSelector);
    const userInfo: any = useSelector(getUserInfoSelector)
    const isLoadingUserPost = useSelector(isLoadingPostSelector);
    const userUID = user && user.uid;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const handleDelete = () => {
        Alert.alert(
            'Чтобы удалить пост перейдите в ленту',
            'Перейти в ленту?',
            [
                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Да',
                    onPress: () => navigation.navigate(screenNames.FEED_SCREEN),
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
    }

    const fetchUserPosts = () => {
        dispatch(setIsLoadingPost(true));
        const postsRef = firebase.database().ref('usersPost')
        const onLoadingFeed = postsRef.on('value', snapshot => {
            const listData: any = [];
            snapshot.forEach(childSnapshot => {
                const userId = childSnapshot.val().userId
                if (route.params ? userId === route.params.userId : userId === userUID) {
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
            .ref(`users/${route.params && route.params.userId || userUID}`)
            .on('value', snapshot => {
                if (snapshot.exists()) {
                    dispatch(setUserInfo(snapshot.val()))
                }
            })
    }

    useEffect(() => {
        getUser().then(() => console.log('user success'));
        fetchUserPosts();
        navigation.addListener("focus", () => setLoading(!loading));
    }, [navigation, loading]);

    return (
        <SafeAreaView style={styles.container}>
            {isLoadingUserPost ? (
                <ActivityIndicator style={styles.loader} size="large" color="#0000ff"/>
            ) : (<ScrollView contentContainerStyle={styles.content}
                             showsVerticalScrollIndicator={false}>
                <Image style={styles.userImage}
                       source={{uri: userInfo && userInfo.userImage || photoUserProfile}}/>
                <Text style={styles.userName}>{userInfo && userInfo.firstName || 'Без имени'}
                    {' '}
                    {userInfo && userInfo.firstName && userInfo.lastName || ''}</Text>
                {!route.params &&
                (<View style={styles.userButtonWrapper}>
                    <CustomProfileButton title='Редактировать профиль' onPress={onPressEditProfile}/>
                    <CustomProfileButton title='Выйти' onPress={onPressLogout}/>

                </View>)}
                {
                    data.map((item: any) => (
                        <PostCard key={item.id}
                                  item={item}
                                  onDelete={handleDelete}
                        />)
                    )
                }

            </ScrollView>)}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        marginBottom: rem(15),
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
        marginTop: rem(4),
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
