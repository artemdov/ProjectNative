import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity, FlatList, Button} from 'react-native';
import {width as w, height as h} from '../../consts/size';
import {Ionicons} from '@expo/vector-icons';
import {Qwe} from '../../styles/FeedStyles'
import {PostCard} from "../../components/PostCard";
import screenNames from "../../navigation/ScreenNames";


export const FeedScreen: React.FC<any> = ({navigation}) => {

    const Posts = [
        {
            id: '1',
            usersName: 'Таня',
            usersImg: require('../../assets/users/user-6.jpg'),
            postsTime: '2 часа назад',
            post: 'Привет',
            postImg: require('../../assets/posts/post-img-1.jpg'),
            liked: true,
            likes: '6',
            comments: '2'
        },
        {
            id: '3',
            usersName: 'Аня',
            usersImg: require('../../assets/users/user-3.jpg'),
            postsTime: '2 часа назад',
            posts: 'Привет',
            postImg: require('../../assets/posts/post-img-2.jpg'),
            liked: true,
            likes: '14',
            comments: '5'
        },
        {
            id: '2',
            usersName: 'Саша',
            usersImg: require('../../assets/users/user-2.jpg'),
            postsTime: '3 часа назад',
            posts: 'Всем привет',
            postImg: require('../../assets/posts/post-img-1.jpg'),
            liked: true,
            likes: '14',
            comments: '5'
        },
        {
            id: '4',
            usersName: 'Влад',
            usersImg: require('../../assets/users/user-2.jpg'),
            postsTime: '1 час назад',
            posts: 'Привет',
            postImg: require('../../assets/posts/post-img-2.jpg'),
            liked: true,
            likes: '6',
            comments: '2'
        }
    ]
    const handleSubmit = () => navigation.navigate(screenNames.ADD_POST_SCREEN)

    return (
        <View style={styles.container}>
            <View style={styles.button}>
            <Button  title='Добавить пост' onPress={handleSubmit}/>
            </View>
            <FlatList data={Posts}
                      renderItem={({item}) => <PostCard item={item}/>}
                      keyExtractor={item => item.id}
                      showsVerticalScrollIndicator={false}
            />

        </View>

    );
};
const styles = StyleSheet.create({
    container: {

        backgroundColor: '#fff',
        alignItems: 'center',
    },
    button: {
        margin: 10,
    }
});
