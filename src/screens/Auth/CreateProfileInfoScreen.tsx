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
  getUserInfoSelector,
  getUserSelector,
  isLoadingImageSelector,
  progressLoadingImageSelector,
} from '../../store/selectors';
import firebase from 'firebase';
import {
  setUserImage,
  setUserInfo,
  uploadImage,
} from '../../store/actions/userProfileActions';
import ImagePicker from 'react-native-image-crop-picker';
import {rem, vrem} from '../../consts/size';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomProfileButton} from '../../components/common/CustomProfileButton';
import {setProfileSetup} from '../../store/actions/authActions';
import {userImagePlaceholder} from '../../consts/userImagePlaceholder';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {UserInfoType} from '../../types/types';

export const CreateProfileInfoScreen: React.FC<any> = ({navigation}) => {
  const user: FirebaseAuthTypes.User | null = useSelector(getUserSelector);
  const isLoadingImage = useSelector(isLoadingImageSelector);
  const userInfo: UserInfoType | null = useSelector(getUserInfoSelector);
  const progressLoadingImage = useSelector(progressLoadingImageSelector);
  const dispatch = useDispatch();

  const userUID = user && user.uid;

  const [firstName, setFirstName] = useState<string>('');

  const [lastName, setLastName] = useState<string>('');

  const [phone, setPhone] = useState<string>('');

  const [country, setCountry] = useState<string>('');

  const [usersImage, setUsersImage] = useState<string | undefined>('');

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 200,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      const imageUri: string | undefined =
        Platform.OS === 'ios' ? image.sourceURL : image.path;
      setUsersImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      const imageUri: string | undefined =
        Platform.OS === 'ios' ? image.sourceURL : image.path;
      setUsersImage(imageUri);
    });
  };

  const updateUserInfo = async () => {
    try {
      let imgUrl: any = await dispatch(uploadImage(usersImage));
      dispatch(setUserImage(''));
      if (imgUrl == null && usersImage) {
        imgUrl = usersImage;
      }
      if (firstName !== '' && lastName !== '') {
        firebase
          .database()
          .ref(`users/${userUID}`)
          .update({
            firstName,
            lastName,
            phone,
            country,
            userImage: imgUrl,
          })
          .then(() => {
            navigation.goBack();
          });
        dispatch(
          setUserInfo({
            ...userInfo,
            firstName,
            lastName,
            phone,
            country,
            userImage: imgUrl,
          }),
        );
        dispatch(setProfileSetup(true));
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.userWrapper}>
        <Image
          source={{uri: usersImage || userImagePlaceholder}}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{`${firstName} ${lastName}`}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <FontAwesome
          style={styles.icon}
          name="user-o"
          color="#333333"
          size={rem(21)}
        />
        <TextInput
          placeholder="Имя"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={firstName}
          onChangeText={setFirstName}
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputWrapper}>
        <FontAwesome
          style={styles.icon}
          name="user-o"
          color="#333333"
          size={rem(21)}
        />
        <TextInput
          placeholder="Фамилия"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={lastName}
          onChangeText={setLastName}
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputWrapper}>
        <FontAwesome
          style={styles.icon}
          name="phone"
          color="#333333"
          size={rem(21)}
        />
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
      <View style={styles.inputWrapper}>
        <FontAwesome
          style={styles.icon}
          name="globe"
          color="#333333"
          size={rem(21)}
        />
        <TextInput
          placeholder="Страна"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={country}
          onChangeText={setCountry}
          style={styles.textInput}
        />
      </View>
      {isLoadingImage ? (
        <View style={styles.statusLoadingWrapper}>
          <Text>{progressLoadingImage} % Загружено!</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.buttonsWrapper}>
          <View style={styles.button}>
            <CustomProfileButton title="Продолжить" onPress={updateUserInfo} />
          </View>
          <ActionButton
            style={styles.actionButtonWrapper}
            size={rem(45)}
            buttonColor="#2e64e5">
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
  userImage: {
    width: rem(63),
    height: vrem(80),
    marginBottom: vrem(10),
    borderRadius: rem(50),
  },
  userPhoto: {
    width: rem(90),
    height: vrem(70),
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonWrapper: {
    marginBottom: rem(15),
    marginRight: rem(8),
    bottom: rem(7),
  },
  icon: {
    marginVertical: rem(11),
  },
  photoIcon: {
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: rem(11),
  },
  inputWrapper: {
    flexDirection: 'row',
    paddingLeft: rem(5),
    borderBottomWidth: vrem(2),
    borderBottomColor: '#f2f2f2',
  },
  textInput: {
    fontSize: rem(14),
    paddingVertical: rem(2),
    paddingLeft: rem(10),
    marginBottom: rem(3),
    color: '#000',
    opacity: 0.6,
  },
  actionButtonIcon: {
    fontSize: rem(22),
    color: '#ffffff',
  },
  button: {
    marginTop: rem(80),
    marginVertical: rem(13),
    paddingHorizontal: rem(80),
  },
  buttonsWrapper: {
    bottom: 80,
    marginTop: vrem(250),
  },
  userName: {
    fontSize: rem(14),
  },
  statusLoadingWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
