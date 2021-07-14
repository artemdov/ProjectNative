import React from 'react';
import {StyleSheet} from "react-native";
import {InputField, InputWrapper, PostContainer} from "../../styles/AddPostStyles";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

export const AddPostScreen = () => {

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
        });
    }
    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
        });
    }

    return (
        <PostContainer>
            <InputWrapper>
                <InputField placeholder='Напишите пост'
                            multiline
                            numberOfLines={4}>
                </InputField>
            </InputWrapper>
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="Сделать фото" onPress={takePhotoFromCamera}>
                    <Icon name="camera-outline" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title="Выбрать из галереи" onPress={choosePhotoFromLibrary}>
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
