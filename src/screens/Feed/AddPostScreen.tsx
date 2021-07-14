import React from 'react';
import {StyleSheet, View} from "react-native";
import {InputField, InputWrapper, PostContainer} from "../../styles/AddPostStyles";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export const AddPostScreen = () => {
    return (
        <PostContainer>
            <InputWrapper>
                <InputField placeholder='Напишите пост'
                            multiline
                            numberOfLines={3}>

                </InputField>
            </InputWrapper>
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="Сделать фото" onPress={() => console.log("notes tapped!")}>
                    <Icon name="camera-outline" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title="Выбрать из галереи" onPress={() => {
                }}>
                    <Icon name="images-outline" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
            </ActionButton>
        </PostContainer>
    )
};
const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});
