import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
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
import {setUserPosts} from "../../store/actions/editUserAction";
import {photoProfile} from "../../utils/helpers";

export const ProfileScreen: React.FC<any> = ({navigation, route}) => {
    const data: any = useSelector(getUserPostsSelector);
    const user: any = useSelector(getUserSelector);
    const userInfo: any = useSelector(getUserInfoSelector)
    const isLoadingUserPost = useSelector(isLoadingPostSelector);
    const userUID = user && user.uid;
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);


    const dispatch = useDispatch();
    console.log('user.uid', userUID)
    console.log('data', data)
    console.log('userInfo', userInfo)
    console.log('route params', route.params)


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
                if(route.params ? childSnapshot.val().userId ===  route.params.userId : childSnapshot.val().userId === userUID) {
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
                // listData.filter((item: any) => item && item.userId != route.params ? route.params.userId :  userUID)
                // console.log('listData', listData)

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
                    console.log('snapshotPROFILE', snapshot.val())
                    //dispatch(setUserInfo(snapshot.val()))
                    setUserData(snapshot.val())
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
            <ScrollView style={styles.wrapper}
                        contentContainerStyle={styles.content}
                        showsVerticalScrollIndicator={false}>
                <Image style={styles.userImage}
                       source={{uri: userData && userData.userImage || photoProfile}}/>
                <Text style={styles.userName}>{userData && userData.firstName || 'Без имени'}
                    {' '}
                    {userData && userData.firstName && userData.lastName || ''}</Text>
                {!route.params &&
                (<View style={styles.userButtonWrapper}>
                    <TouchableOpacity style={styles.userButton} onPress={onPressLogout}>
                        <Text style={styles.userButtonText}>Выйти</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.userButton}
                                      onPress={onPressEditProfile}>
                        <Text style={styles.userButtonText}>Редактировать профиль</Text>
                    </TouchableOpacity>
                </View>)}
                {isLoadingUserPost ? (
                    <ActivityIndicator style={styles.loader} size="large" color="#0000ff"/>
                ) : (
                    data.map((item: any) => (
                        <PostCard key={item.id}
                                  item={item}
                        />)
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        padding: rem(18),
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    userImage: {
        width: rem(175),
        height: vrem(220),
        backgroundColor: '#666',
        borderRadius: rem(90),
    },
    userName: {
        fontSize: rem(18),
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userButtonWrapper: {},
    userButton: {},
    userButtonText: {},
});
