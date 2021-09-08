import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  getImageUserSelector,
  getUserInfoSelector,
  getUserSelector,
  isLoadingEditUserSelector,
  isTransferredEditUserSelector,
} from '../../store/selectors';
import firebase from 'firebase';
import {
  setUserImage,
  setUserInfo,
  uploadImage,
} from '../../store/actions/profileUserAction';
import ImagePicker from 'react-native-image-crop-picker';
import {rem, vrem} from '../../consts/size';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomProfileButton} from '../../components/common/CustomProfileButton';
import {photoUserProfile} from '../../consts/photoUserProfile';
import {UserInfoType} from '../../types/types';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const EditProfileScreen: React.FC<any> = ({navigation}) => {
  const userInfo: UserInfoType | null = useSelector(getUserInfoSelector);
  const userImage = useSelector(getImageUserSelector);
  const user: FirebaseAuthTypes.User | null = useSelector(getUserSelector);
  const isLoadingInfo = useSelector(isLoadingEditUserSelector);
  const isTransferred = useSelector(isTransferredEditUserSelector);
  const dispatch = useDispatch();

  const userFirstName = userInfo && userInfo.firstName;

  const userLastName = userInfo && userInfo.lastName;

  const userUID = user && user.uid;

  const imageUser = userInfo && userInfo.userImage;

  const [firstName, setFirstName] = useState('');

  const [lastName, setLastName] = useState('');

  const [phone, setPhone] = useState('');

  const [country, setCountry] = useState('');

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

  const handleUpdate = async () => {
    let imgUrl: any = await dispatch(uploadImage(userImage));
    dispatch(setUserImage(''));
    if (imgUrl == null && imageUser) {
      imgUrl = imageUser;
    }
    await firebase.database().ref(`users/${userUID}`).update({
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      country: country,
      userImage: imgUrl,
    });
    await firebase
      .database()
      .ref(`users/${userUID}`)
      .get()
      .then(snapshot => {
        if (snapshot.exists()) {
          dispatch(setUserInfo(snapshot.val()));
        }
      })
      .then(() => {
        navigation.goBack();
      });
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.userWrapper}>
        <Image
          source={{uri: userImage || photoUserProfile}}
          style={styles.imageUser}
        />
        <Text style={styles.userName}>
          {`${userFirstName || 'Без имени'} ${
            (userFirstName && userLastName) || ''
          }`}
        </Text>
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#333333" size={20} />
        <TextInput
          placeholder="Имя"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={firstName}
          onChangeText={setFirstName}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#333333" size={20} />
        <TextInput
          placeholder="Фамилия"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={lastName}
          onChangeText={setLastName}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="phone" color="#333333" size={20} />
        <TextInput
          placeholder="Телефон"
          placeholderTextColor="#666666"
          keyboardType="number-pad"
          autoCorrect={false}
          value={phone}
          onChangeText={setPhone}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="globe" color="#333333" size={20} />
        <TextInput
          placeholder="Страна"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={country}
          onChangeText={setCountry}
          style={styles.textInput}
        />
      </View>
      {isLoadingInfo ? (
        <View style={styles.statusLoadingWrapper}>
          <Text>{isTransferred} % Загружено!</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View>
          <View style={styles.button}>
            <CustomProfileButton title="Обновить" onPress={handleUpdate} />
          </View>
          <ActionButton size={rem(50)} buttonColor="#2e64e5">
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="Сделать фото"
              onPress={takePhotoFromCamera}>
              <Icon name="camera-outline" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="rgba(231,76,60,1)"
              title="Выбрать из галереи"
              onPress={choosePhotoFromLibrary}>
              <Icon name="images-outline" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageUser: {
    width: rem(90),
    height: vrem(110),
    borderRadius: rem(50),
  },
  photoUser: {
    width: rem(90),
    height: vrem(110),
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoIcon: {
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: rem(11),
  },
  action: {
    flexDirection: 'row',
    paddingBottom: vrem(4),
    paddingLeft: rem(5),
    marginVertical: vrem(6),
    borderBottomWidth: vrem(2),
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
  button: {
    marginTop: vrem(200),
    paddingHorizontal: rem(80),
  },
  userName: {
    fontSize: rem(14),
  },
  statusLoadingWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
