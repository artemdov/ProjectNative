import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Button} from 'react-native';
import {height as h, width as w} from "../consts/size";
import {useSelector} from "react-redux";
import {getUserSelector} from "../store/selectors";

export const CommentInput: React.FC<any> = ({item}) => {
    console.log('item', item)
    const [commentsValue, setCommentsValue] = useState('')
    const onChangeCommentsValue = (value: string) => {
        setCommentsValue(value)
    }

    const addComment = () => {

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
                <Button onPress={() => {
                }}  title='Отправить'/>
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


