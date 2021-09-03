import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
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
  isTransferredSelector,
  getImageSelector,
  isLoadingEditUserSelector,
} from '../../store/selectors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomFormButton} from '../../components/common/CustomFormButton';
import {rem, vrem} from '../../consts/size';
import {setImage} from '../../store/actions/feedAction';
import firebase from 'firebase';
import {setUserPosts, uploadImage} from '../../store/actions/profileUserAction';

export const AddPostScreen: React.FC<any> = ({navigation}) => {
  const newImage = useSelector(getImageSelector);
  const user: any = useSelector(getUserSelector);
  const isTransferred = useSelector(isTransferredSelector);
  const isLoadingImage = useSelector(isLoadingEditUserSelector);
  const dispatch = useDispatch();

  const userUID = user && user.uid;

  const [postValue, setPostValue] = useState('');

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
    const imageUrl = await dispatch(uploadImage(newImage));
    dispatch(setImage(''));
    await firebase
      .database()
      .ref(`usersPost/${key}`)
      .update({
        id: key,
        userId: user.uid,
        post: postValue,
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
    await firebase
      .database()
      .ref('usersPost')
      .on('value', snapshot => {
        const listData: any = [];
        snapshot.forEach(childSnapshot => {
          const userId = childSnapshot.val().userId;
          if (userId === userUID) {
            const {id, userId, post, postImg, postTime, likes, userImage} =
              childSnapshot.val();
            listData.push({
              id,
              userId,
              userImage,
              postTime,
              post,
              postImg,
              likes,
            });
          }
        });
        dispatch(setUserPosts(listData));
      });
  };

  const onChangePost = (value: string) => {
    setPostValue(value);
  };

  return (
    <SafeAreaView style={styles.containerWrapper}>
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
            <CustomFormButton title="Отправить" onPress={submitPost} />
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
    </SafeAreaView>
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
    borderRadius: rem(10),
    paddingHorizontal: rem(26),
    marginBottom: rem(6),
  },
  imageStyle: {
    width: rem(350),
    height: vrem(350),
    marginTop: rem(5),
    borderRadius: rem(15),
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
