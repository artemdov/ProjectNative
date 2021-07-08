import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {width as w, height as h} from '../../consts/size';

export const FeedScreen: React.FC<any> = ({navigation}) => {


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.userInfo}>
                    <Image style={styles.userImg} source={require('../../assets/users/user-3.jpg')}/>
                    <View style={styles.userInfoText}>
                        <Text style={styles.userName}>Аня</Text>
                        <Text style={styles.postTime}>2 часа назад</Text>
                    </View>
                </View>
                <Text style={styles.postText}>Всем привет</Text>
                <Image style={styles.postImg} source={require('../../assets/posts/post-img-2.jpg')}/>
            <View style={styles.interactionWrapper}>
                <TouchableOpacity style={styles.interaction}>
                    <Text>Лайк</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#f8f8f8',
        width: '100%',
        marginBottom: 20,
        borderRadius: 10,
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 15,
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    userInfoText: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },
    postTime: {
        fontSize: 12,
        color: '#666'
    },
    postText: {
        fontSize: 14,
        paddingLeft: 15,
        paddingRight: 15,
    },
    postImg: {
        width: '100%',
        height: 250,
        marginTop: 15,
    },
    interactionWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
    },
    interaction: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 4,
    },


});
