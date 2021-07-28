import React, {useEffect} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import {width as w, height as h} from '../../consts/size';
import {Container} from '../../styles/FeedStyles'
import {PostCard} from "../../components/PostCard";
import screenNames from "../../navigation/ScreenNames";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "firebase";
import {useDispatch, useSelector} from "react-redux";
import {
    isLoadingPostSelector,
    setPostDataSelector
} from "../../store/selectors";
import {isLoadingPostValue, setPostData} from "../../store/actions/feedAction";
import storage from "@react-native-firebase/storage";

export const FeedScreen: React.FC<any> = ({navigation}) => {
    const dispatch = useDispatch()
    const loadPostInFeed = useSelector(isLoadingPostSelector)
    const data: any = useSelector(setPostDataSelector)
    const handleSubmit = () => navigation.navigate(screenNames.ADD_POST_SCREEN)
    console.log('data', data)
    const fetch = () => {
        dispatch(isLoadingPostValue(true))
        const usersPostRef = firebase.database().ref('usersPost')
        const onLoadingFeed = usersPostRef.on('value', snapshot => {
            const listData: any = []
            snapshot.forEach((childSnapshot) => {
                const {id, userId, post, postImg, postTime, likes} = childSnapshot.val()
                listData.push({
                    id,
                    userId,
                    usersName: 'Имя',
                    usersImg: 'https://lh5.googleusercontent.com/' +
                        '-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/' +
                        'AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                    postTime,
                    post,
                    postImg,
                    likes,

                })
            })
            dispatch(setPostData(listData))
            dispatch(isLoadingPostValue(false))
        })
        return () => {
            usersPostRef.off('value', onLoadingFeed)
        }

    }

    useEffect(() => {
        fetch()
    }, [])

    const handleDelete = (postId: string) => {
        Alert.alert(
            'Удалить пост',
            'Вы уверены?',
            [
                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    onPress: () => deletePost(postId),
                    style: 'cancel'
                },
            ],
            {cancelable: false}
        )
    }
    const deletePost = (postId: string) => {
        firebase.database()
            .ref(`usersPost/${postId}`)
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const {postImg} = snapshot.val()
                    if (postImg) {
                        const storageRef = storage().refFromURL(postImg)
                        const imageRef = storage().ref(storageRef.fullPath)
                        imageRef
                            .delete()
                            .then(() => {
                                console.log(`${postImg} успешно удалена!`)
                                deleteFirebaseData(postId)
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    } else {
                        deleteFirebaseData(postId)
                    }
                }
            })
        const deleteFirebaseData = (postId: string) => {
            firebase.database()
                .ref(`usersPost/${postId}`)
                .remove()
                .then(() => {
                    Alert.alert(
                        'Пост удален',
                        'Ваш пост удален успешно!'
                    )
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }
    return (
        <Container>
            <TouchableOpacity style={styles.buttonAddPost} onPress={handleSubmit}>
                <Ionicons name='add-circle' size={45} color="#2e64e5"/>
            </TouchableOpacity>
            {loadPostInFeed
                ? <ActivityIndicator size='large' color='#0000ff'/>
                : <FlatList data={data}
                            renderItem={({item}) => <PostCard item={item}  onDelete={handleDelete}/>}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                />}


        </Container>

    );
};

const styles = StyleSheet.create({
    buttonAddPost: {
        margin: 5,
        marginLeft: w / 1.2,
    },

});
