import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {rem} from '../consts/size';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInfoSelector, getUserSelector} from '../store/selectors';
import firebase from 'firebase';
import {setUserCommentsFromFirebase} from '../store/actions/feedActions';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {UserInfoType} from '../types/types';

export const CommentInput: React.FC<any> = ({item}) => {
  const commentKey: string | null = firebase.database().ref().push().key;
  const user: FirebaseAuthTypes.User | null = useSelector(getUserSelector);
  const userInfo: UserInfoType | null = useSelector(getUserInfoSelector);
  const dispatch = useDispatch();

  const userUID = user && user.uid;

  const image = userInfo && userInfo.userImage;

  const firstName = userInfo && userInfo.firstName;

  const lastName = userInfo && userInfo.lastName;

  const [commentValue, setCommentValue] = useState('');

  const addComment = async () => {
    try {
      await firebase
        .database()
        .ref(`comments/${commentKey}`)
        .update({
          comment: commentValue,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          postId: item.id,
          userId: userUID,
          userName: `${firstName} ${lastName}`,
          userImage: image,
        })
        .then(() => {
          setCommentValue('');
          console.log('comment added');
        });
      dispatch(setUserCommentsFromFirebase());
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Комментарий"
        multiline
        value={commentValue}
        onChangeText={setCommentValue}
      />
      <TouchableOpacity onPress={addComment} style={styles.button}>
        <Text style={styles.buttonName}>Отправить</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: rem(240),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#5a8efd',
    marginVertical: rem(9),
    marginHorizontal: rem(35),
    padding: rem(8),
  },
  buttonName: {
    fontSize: rem(12),
  },
  input: {
    fontSize: rem(16),
    margin: rem(12),
    borderBottomWidth: 1,
    paddingVertical: rem(5),
    paddingRight: rem(95),
  },
});
