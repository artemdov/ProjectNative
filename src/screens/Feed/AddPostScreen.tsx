import React, {useState} from 'react';
import {ActivityIndicator, Alert, Image, Platform, StyleSheet, Text, TextInput, View} from "react-native";
import {ContainerWrapper} from "../../styles/AddPostStyles";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from "react-redux";
import {getUserSelector, isLoadingImageSelector, isTransferredSelector, setImageSelector} from "../../store/selectors";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {CustomButton} from "../../components/common/CustomButton";
import {height as h, width as w} from '../../consts/size';
import {setImage, setTransferred, upLoadingForImage} from "../../store/actions/feedAction";
import storage from '@react-native-firebase/storage';
import {StatusLoadingWrapper} from "../../styles/FeedStyles";
import firebase from "firebase";

export const AddPostScreen = () => {
    const [postValue, setPostValue] = useState('')

    const dispatch = useDispatch()
    const newImage = useSelector(setImageSelector)
    const user: any = useSelector(getUserSelector)
    const isTransferred = useSelector(isTransferredSelector)
    const isLoad = useSelector(isLoadingImageSelector)

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 200,
            cropping: true,
            freeStyleCropEnabled: true,
        }).then(image => {
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
            dispatch(setImage(imageUri))
        });
    }
    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 200,
            cropping: true,
            freeStyleCropEnabled: true,
        }).then(image => {
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
            dispatch(setImage(imageUri))
        });
    }

    const submitPost = async () => {
        const key: any = await firebase.database().ref().push().key
        const imageUrl = await uploadImage()
        dispatch(setImage(''))
        await firebase.database()
            .ref(`usersPost/${key}`)
            .update({
                id: key,
                userId: user.uid || null,
                post: postValue,
                postImg: imageUrl,
                postTime: firebase.database.ServerValue.TIMESTAMP,
                comments: null,
                likes: null
            })
            .then(() => {
                setPostValue('')
                Alert.alert(
                    'Пост опубликован',
                    'Пост успешно опубликован!'
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const onChangePost = (value: string) => {
        setPostValue(value)
    }

    const uploadImage = async () => {
        if (!newImage) {
            return null
        }
        const uploadUri = newImage
        const fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)
        const storageRef = storage().ref(`photos/${fileName}`)
        const task = storageRef.putFile(uploadUri)
        task.on('state_changed', taskSnapshot => {
            dispatch(setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
            ))
        });
        try {
            dispatch(upLoadingForImage(true))
            dispatch(setTransferred(0))
            await task
            const url = await storageRef.getDownloadURL()
            dispatch(upLoadingForImage(false))
            return url
        } catch (err) {
            Alert.alert(err)
            return ('')
        }
    }

    return (
        <ContainerWrapper>
            <KeyboardAwareScrollView>
                {newImage
                    ? <Image source={{uri: newImage}} style={styles.imageStyle}/>
                    : <Icon name='camera' size={w - 80} color='#fff' style={styles.photoFeed}/>}
                {isLoad ? (
                    <StatusLoadingWrapper>
                        <Text>{isTransferred} % Загружено!</Text>
                        <ActivityIndicator size='large' color='#0000ff'/>
                    </StatusLoadingWrapper>
                ) : (
                    <View style={styles.customButton}>
                        <CustomButton title='Отправить' onPress={submitPost}/>
                    </View>
                )}
                <TextInput style={styles.input}
                           placeholder='Подпись к фото'
                           multiline
                           value={postValue}
                           onChangeText={onChangePost}
                >
                </TextInput>
                <ActionButton size={w / 7} style={styles.actionButtonStyle} buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="Сделать фото" onPress={takePhotoFromCamera}>
                        <Icon name="camera-outline" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Выбрать из галереи"
                                       onPress={choosePhotoFromLibrary}>
                        <Icon name="images-outline" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                </ActionButton>
            </KeyboardAwareScrollView>
        </ContainerWrapper>
    )
};
const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: h / 30,
        height: 22,
        color: '#ffffff',
    },
    photoFeed: {
        opacity: 0.8,
        borderRadius: 10,
        marginBottom: h / 40,
        marginLeft: w / 15,
    },
    imageStyle: {
        width: w / 1.1,
        height: h / 2,
        borderRadius: 10
    },
    actionButtonStyle: {
        marginBottom: h / 5,
    },
    customButton: {
        marginTop: h / 15
    },
    input: {
        fontSize: w / 30,
        marginTop: h / 20,
        borderBottomWidth: 1,
        paddingVertical: h / 150 - 20,
    },
});
