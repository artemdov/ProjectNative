import React, {useEffect} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {onSubmitLogOut} from '../../store/actions/authAction';
import screenNames from '../../navigation/ScreenNames';
import {rem, vrem} from '../../consts/size';
import {getImageUserSelector, getPostsSelector, getUserInfoSelector, getUserSelector} from "../../store/selectors";
import {setIsLoadingPost, setPosts} from "../../store/actions/feedAction";
import firebase from "firebase";
import {PostCard} from "../../components/PostCard";

export const ProfileScreen: React.FC<any> = ({navigation, route}) => {
    const data: any = useSelector(getPostsSelector);
    const user: any = useSelector(getUserSelector);
    const userImage = useSelector(getImageUserSelector)
    const userInfo: any = useSelector(getUserInfoSelector)
    const userUID = user && user.uid;
    const dispatch = useDispatch();

    const onPressLogout = () => {
        dispatch(onSubmitLogOut());
        navigation.navigate(screenNames.LANDING_SCREEN);
    };

    const onPressEditProfile = () => {
        navigation.navigate(screenNames.EDIT_PROFILE_SCREEN);
    }

    const fetchUser = () => {
        dispatch(setIsLoadingPost(true));
        const postsRef = firebase.database().ref('usersPost')
        const onLoadingFeed = postsRef.on('value', snapshot => {
            const listData: any = [];
            snapshot.forEach(childSnapshot => {
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
            });
            dispatch(setPosts(listData));
            dispatch(setIsLoadingPost(false));
        });
        return () => {
            postsRef.off('value', onLoadingFeed);
        };
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.wrapper}
                        contentContainerStyle={styles.content}
                        showsVerticalScrollIndicator={false}>
                <Image style={styles.userImage} source={{uri: userImage}}/>
                <Text style={styles.userName}>{userInfo && userInfo.firstName || 'Без имени'} {userInfo && userInfo.firstName && userInfo.lastName || ''}</Text>
                <Text style={styles.userName}>{route.params ? route.params.userId : userUID}</Text>
                <View style={styles.userButtonWrapper}>
                    <TouchableOpacity style={styles.userButton} onPress={onPressLogout}>
                        <Text style={styles.userButtonText}>Выйти</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.userButton}
                                      onPress={onPressEditProfile}>
                        <Text style={styles.userButtonText}>Редактировать профиль</Text>
                    </TouchableOpacity>
                </View>
                {
                    data.map((item: any) => (
                        userUID === item.userId &&
                        <PostCard key={item.id}
                                  item={item}
                        />

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
        borderRadius: rem(90),
    },
    userName: {
        fontSize: rem(18),
    },
    userButtonWrapper: {},
    userButton: {},
    userButtonText: {},
});
