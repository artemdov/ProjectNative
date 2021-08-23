import React, {useEffect} from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    ImageBackground,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useDispatch, useSelector} from "react-redux";
import {
    getImageUserSelector,
    getUserInfoSelector,
    getUserSelector,
    isLoadingEditUserSelector, isTransferredEditUserSelector
} from "../../store/selectors";
import firebase from "firebase";
import {
    setTransferredUserImage, setUserImage,
    setUserInfo,
    upLoadingUserImage
} from "../../store/actions/editUserAction";
import storage from "@react-native-firebase/storage";
import ImagePicker from "react-native-image-crop-picker";
import {rem, vrem} from "../../consts/size";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

export const EditProfileScreen: React.FC<any> = ({navigation}) => {
    const userInfo: any = useSelector(getUserInfoSelector)
    const userImage = useSelector(getImageUserSelector)
    const user: any = useSelector(getUserSelector)
    const isLoadingInfo = useSelector(isLoadingEditUserSelector)
    const isTransferred = useSelector(isTransferredEditUserSelector)
    console.log('userInfo', userInfo)
    const dispatch = useDispatch()

    const getUser = async () => {
        await firebase
            .database()
            .ref(`users/${user.uid}`)
            .get()
            .then(snapshot => {
                console.log(snapshot,snapshot.val())
                if (snapshot.exists()) {
                    dispatch(setUserInfo(snapshot.val()))
                }
            })
    }

    const handleUpdate = async () => {
        let imgUrl = await uploadUserImage();
        if (imgUrl == null && userInfo.userImage) {
            imgUrl = userInfo.userImage;
        }
        firebase
            .database()
            .ref(`users/${user.uid}`)
            .update({
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                phone: userInfo.phone,
                country: userInfo.country,
                city: userInfo.city,
                userImage: imgUrl,
            })
            .then(() => {
                navigation.goBack();
                Alert.alert(
                    'Профиль обновлен!',
                    'Ваш профиль обновлен успешно.'
                );
            })
    }

    const uploadUserImage = async () => {
        if (!userImage) {
            return null;
        }
        const uploadUri = userImage;
        let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        const extension = fileName.split('.').pop();
        const name = fileName.split('.').slice(0, -1).join('.');
        fileName = name + Date.now() + '.' + extension;
        const storageRef = storage().ref(`photos/${fileName}`);
        const task = storageRef.putFile(uploadUri);
        task.on('state_changed', taskSnapshot => {
            dispatch(
                setTransferredUserImage(
                    Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                    100,
                ),
            );
        });
        try {
            dispatch(upLoadingUserImage(true));
            dispatch(setTransferredUserImage(0));
            await task;
            const url = await storageRef.getDownloadURL();
            dispatch(upLoadingUserImage(false));
            return url;
        } catch (err) {
            Alert.alert(err);
            return '';
        }
    };

    useEffect(() => {
        getUser().then(() => console.log('user success'));
    }, []);

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 200,
            cropping: true,
            freeStyleCropEnabled: true,
        }).then(image => {
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            dispatch(setUserImage(imageUri));
        });
    };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 200,
            cropping: true,
            freeStyleCropEnabled: true,
        }).then(image => {
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            dispatch(setUserImage(imageUri));
        });
    };

    return (
        <KeyboardAwareScrollView style={styles.container}>
            {userInfo && userInfo.userImage ? (<ImageBackground
                    source={{uri: userImage || userInfo && userInfo.userImage}}
                    style={{height: 100, width: 100}}
                    imageStyle={{borderRadius: 15}}/>)
                :
                (<View
                    style={{
                        width: rem(70),
                        height: vrem(100),
                        backgroundColor: 'gray',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                        name="camera"
                        size={55}
                        color="red"
                        style={{
                            opacity: 0.9,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: '#fff',
                            borderRadius: 10,
                        }}
                    />
                </View>)}
            <View style={styles.action}>
                <FontAwesome name="user-o" color="#333333" size={20}/>
                <TextInput
                    placeholder="Имя"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={userInfo ? userInfo.firstName : ''}
                    onChangeText={(value) => dispatch(setUserInfo({...userInfo, firstName: value}))}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <FontAwesome name="user-o" color="#333333" size={20}/>
                <TextInput
                    placeholder="Фамилия"
                    placeholderTextColor="#666666"
                    value={userInfo ? userInfo.lastName : ''}
                    onChangeText={(value) => dispatch(setUserInfo({...userInfo, lastName: value}))}
                    autoCorrect={false}
                    style={styles.textInput}
                />
            </View>

            <View style={styles.action}>
                <FontAwesome name="phone" color="#333333" size={20}/>
                <TextInput
                    placeholder="Телефон"
                    placeholderTextColor="#666666"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    value={userInfo ? userInfo.phone : ''}
                    onChangeText={(value) => dispatch(setUserInfo({...userInfo, phone: value}))}
                    style={styles.textInput}
                />
            </View>

            <View style={styles.action}>
                <FontAwesome name="globe" color="#333333" size={20}/>
                <TextInput
                    placeholder="Страна"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={userInfo ? userInfo.country : ''}
                    onChangeText={(value) => dispatch(setUserInfo({...userInfo, country: value}))}
                    style={styles.textInput}
                />
            </View>
            {isLoadingInfo ? (
                <View style={styles.statusLoadingWrapper}>
                    <Text>{isTransferred} % Загружено!</Text>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            ) : (<View>
                <ActionButton
                    size={rem(50)}
                    style={styles.actionButtonStyle}
                    buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item
                        buttonColor="#9b59b6"
                        title="Сделать фото"
                        onPress={takePhotoFromCamera}>
                        <Icon name="camera-outline" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor="#3498db"
                        title="Выбрать из галереи"
                        onPress={choosePhotoFromLibrary}>
                        <Icon name="images-outline" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                </ActionButton>
                <View style={styles.button}>
                    <Button title="Обновить" onPress={handleUpdate}/>
                </View>
            </View>)}
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    action: {
        flexDirection: 'row',
        paddingBottom: vrem(4),
        paddingLeft: rem(5),
        marginVertical: rem(6),
        borderBottomWidth: rem(2),
        borderBottomColor: '#f2f2f2',
    },
    textInput: {
        flex: 1,
        marginTop: vrem(-20),
        paddingLeft: rem(10),
        color: '#333333',
        opacity: 0.6,
    },
    actionButtonIcon: {
        fontSize: rem(22),
        color: '#ffffff',
    },
    actionButtonStyle: {
        marginVertical: vrem(8),
        marginHorizontal: rem(-22),
    },
    button: {
        marginTop: vrem(230),
        paddingHorizontal: rem(6),
    },
    statusLoadingWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
