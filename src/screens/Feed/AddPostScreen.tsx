import React from 'react';
import {Image, StyleSheet, TextInput, View} from "react-native";
import {ContainerWrapper} from "../../styles/AddPostStyles";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from "react-redux";
import {changeValueSelector, setImageSelector} from "../../store/selectors";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {CustomButton} from "../../components/common/CustomButton";
import {width as w, height as h} from '../../consts/size';
import {changeValue, setImage} from "../../store/actions/feedAction";


export const AddPostScreen = () => {

    const newImage = useSelector(setImageSelector)
    const valueInput = useSelector(changeValueSelector)
    const dispatch = useDispatch()

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 200,
            cropping: true,
            freeStyleCropEnabled: true,
        }).then(image => {
            dispatch(setImage(image.path))
        });
    }
    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 200,
            cropping: true,
            freeStyleCropEnabled: true,
        }).then(image => {
            dispatch(setImage(image.path))
        });
    }
    const OnPressHandler = (value: any) => {
    dispatch(changeValue(value))
    }
    return (
        <ContainerWrapper>
            <KeyboardAwareScrollView>
                {newImage
                    ? <Image source={{uri:newImage}} style={styles.imageStyle}/>
                    : <Icon name='camera' size={w - 80} color='#fff' style={styles.photoFeed}/>}
                <TextInput style={styles.input}
                           placeholder='Подпись к фото'
                            multiline
                >
                </TextInput>
                <View style={styles.customButton}>
                    <CustomButton title='Отправить' onPress={OnPressHandler}/>
                </View>
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
