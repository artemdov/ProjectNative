import React from 'react';
import {StyleSheet, View, FlatList, Button, TouchableOpacity} from 'react-native';
import {width as w, height as h} from '../../consts/size';
import {Container} from '../../styles/FeedStyles'
import {PostCard} from "../../components/PostCard";
import screenNames from "../../navigation/ScreenNames";
import Ionicons from "react-native-vector-icons/Ionicons";


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
        <Container>
            <TouchableOpacity style={styles.buttonAddPost} onPress={handleSubmit}>
            <Ionicons name='add-circle' size={45} color="#2e64e5" />
            </TouchableOpacity>
            <FlatList data={Posts}
                      renderItem={({item}) => <PostCard item={item}/>}
                      keyExtractor={item => item.id}
                      showsVerticalScrollIndicator={false}
            />

        </Container>

    );
};

const styles = StyleSheet.create({
    buttonAddPost: {
        margin: 5,
        marginLeft: w / 1.2,
    },

});
