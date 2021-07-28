import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, Button} from 'react-native';
import {height as h, width as w} from "../consts/size";
import {useSelector} from "react-redux";
import {getUserSelector} from "../store/selectors";
import firebase from "firebase";
import {isLoadingPostValue, setPostData} from "../store/actions/feedAction";

export const CommentInput: React.FC<any> = ({item}) => {
    const commentKey: any =  firebase.database().ref().push().key
    const user: any = useSelector(getUserSelector)

    const [commentsValue, setCommentsValue] = useState('')
    const onChangeCommentsValue = (value: string) => {
        setCommentsValue(value)
    }

    const addComment = () => {

        firebase.database()
            .ref(`comments/${commentKey}`)
            .update({
                comment: commentsValue,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                postId: item.id,
                userId: user.uid,
                usersName: 'Имя',
                    usersImg: 'https://lh5.googleusercontent.com/' +
                        '-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/' +
                        'AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',

            }).then(() => {
            setCommentsValue('')
            console.log('comment added')
        })
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                       placeholder='Комментарий'
                       multiline
                       value={commentsValue}
                       onChangeText={onChangeCommentsValue}
            />
            <View style={styles.button}>
                <Button onPress={addComment} title='Отправить'/>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"


    },
    button: {
        margin: w / 30,

    },
    input: {
        fontSize: w / 23,
        margin: w / 30,
        borderBottomWidth: 1,
        paddingVertical: h / 150,
        paddingRight: w / 4,
    },
});


