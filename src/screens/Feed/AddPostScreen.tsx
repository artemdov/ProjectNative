import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserSelector,
  isLoadingImageSelector,
  isTransferredSelector,
  getImageSelector,
} from '../../store/selectors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomButton} from '../../components/common/CustomButton';
import {height as h, rem, vrem, width as w} from '../../consts/size';
import {
  setImage,
  setTransferred,
  upLoadingImage,
} from '../../store/actions/feedAction';
import storage from '@react-native-firebase/storage';
import firebase from 'firebase';

export const AddPostScreen: React.FC<any> = ({navigation}) => {
  const [postValue, setPostValue] = useState('');
  const dispatch = useDispatch();
  const newImage = useSelector(getImageSelector);
  const user: any = useSelector(getUserSelector);
  const isTransferred = useSelector(isTransferredSelector);
  const isLoadingImage = useSelector(isLoadingImageSelector);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 200,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      dispatch(setImage(imageUri));
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
      dispatch(setImage(imageUri));
    });
  };

  const submitPost = async () => {
    const key: any = await firebase.database().ref().push().key;
    const imageUrl = await uploadImage();
    dispatch(setImage(''));
    await firebase
      .database()
      .ref(`usersPost/${key}`)
      .update({
        id: key,
        userId: user.uid || null,
        post: postValue,
        userName: user.uid,
        postImg: imageUrl,
        postTime: firebase.database.ServerValue.TIMESTAMP,
        comments: null,
        likes: [],
      })
      .then(() => {
        setPostValue('');
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onChangePost = (value: string) => {
    setPostValue(value);
  };

  const uploadImage = async () => {
    if (!newImage) {
      return null;
    }
    const uploadUri = newImage;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = fileName.split('.').pop();
    const name = fileName.split('.').slice(0, -1).join('.');
    fileName = name + Date.now() + '.' + extension;
    const storageRef = storage().ref(`photos/${fileName}`);
    const task = storageRef.putFile(uploadUri);
    task.on('state_changed', taskSnapshot => {
      dispatch(
        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
        ),
      );
    });
    try {
      dispatch(upLoadingImage(true));
      dispatch(setTransferred(0));
      await task;
      const url = await storageRef.getDownloadURL();
      dispatch(upLoadingImage(false));
      return url;
    } catch (err) {
      Alert.alert(err);
      return '';
    }
  };

  return (
    <View style={styles.containerWrapper}>
      <KeyboardAwareScrollView>
        {newImage ? (
          <Image source={{uri: newImage}} style={styles.imageStyle} />
        ) : (
          <Icon
            name="camera"
            size={rem(300)}
            color="#fff"
            style={styles.photoFeed}
          />
        )}
        {isLoadingImage ? (
          <View style={styles.statusLoadingWrapper}>
            <Text>{isTransferred} % Загружено!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View style={styles.customButton}>
            <CustomButton title="Отправить" onPress={submitPost} />
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholder="Подпись к фото"
          multiline
          value={postValue}
          onChangeText={onChangePost}
        />
        <ActionButton
          size={rem(50)}
          style={styles.actionButtonStyle}
          buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Сделать фото"
            onPress={takePhotoFromCamera}>
            <Icon name="camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Выбрать из галереи"
            onPress={choosePhotoFromLibrary}>
            <Icon name="images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2e64e515',
  },
  actionButtonIcon: {
    fontSize: rem(22),
    color: '#ffffff',
  },
  photoFeed: {
    opacity: 0.8,
    borderRadius: 10,
    paddingHorizontal: rem(26),
    marginBottom: rem(6),
  },
  imageStyle: {
    width: w / 1.1,
    height: h / 2,
    borderRadius: 10,
  },
  actionButtonStyle: {
    marginBottom: rem(110),
  },
  customButton: {
    marginTop: rem(11),

  },
  input: {
    fontSize: rem(12),
    marginTop: rem(40),
    borderBottomWidth: 1,
    paddingVertical: vrem(1),

  },
  statusLoadingWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
