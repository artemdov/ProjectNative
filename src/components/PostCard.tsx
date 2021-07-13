import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {height as h, width as w} from "../consts/size";
import {Qwe} from "../styles/FeedStyles";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";

export const PostCard: React.FC<any> = ({item}) => (
    <View style={styles.card}>
        <View style={styles.userInfo}>
            <Image style={styles.userImg} source={item.usersImg}/>
            <View style={styles.userInfoText}>
                <Text style={styles.userName}>{item.usersName}</Text>
                <Text style={styles.postTime}>{item.postsTime}</Text>
            </View>
        </View>
        <Text style={styles.postText}>{item.posts}</Text>

        <Image style={styles.postImg} source={item.postImg}/>

        <View style={styles.divider}/>
        <View style={styles.interactionWrapper}>
            <TouchableOpacity style={[styles.interaction]}>
                <Image style={styles.interactionHeart} source={require('../assets/heart.jpg')}/>

                {/*<MaterialCommunityIcons name="badminton" size={24} color="black" />
                <Ionicons name="battery-dead" size={24} color="black" />
*/}
                <Text style={[styles.interactionText]}>Лайк</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.interaction]}>
                <Image style={styles.interactionHeart} source={require('../assets/comment.png')}/>
                <Text style={[styles.interactionText]}>Комментарии</Text>
            </TouchableOpacity>
{/*
            <Qwe><Text>ASDSASD</Text></Qwe>
*/}
        </View>
    </View>
)

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f8f8',
        width: w - 40,
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
    interactionText: {
        fontSize: h / 40,
        fontWeight: 'bold',
        marginTop: 5,
    },
    interactionHeart: {
        width: w / 18,
        height: h / 30,
        color: '#333',
        marginTop: 5,
        marginRight: h / 90,
    },
    divider: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        width: '93%',
        alignSelf: 'center',
        marginTop: h / 55,
    }
});

