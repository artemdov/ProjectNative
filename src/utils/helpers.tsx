import storage from "@react-native-firebase/storage";
import {setTransferredUserImage, upLoadingUserImage} from "../store/actions/profileUserAction";
import {Alert} from "react-native";
import {useDispatch} from "react-redux";
import firebase from "firebase";

const dispatch = useDispatch();

export const artworkImageUrl = (imageId: string) => {
  return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
};

export const photoUserProfile = 'https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-photography-camera-graphic-icon-design-template-png-image_316192.jpg';


export const uploadImage = async (image: string) => {
  if (!image) {
    return null;
  }
  const uploadUri = image;
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

