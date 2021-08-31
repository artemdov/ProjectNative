import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {rem} from '../consts/size';
import {useSelector} from 'react-redux';
import {getUserInfoSelector, getUserSelector} from '../store/selectors';
import firebase from 'firebase';

export const CommentInput: React.FC<any> = ({item}) => {
  const commentKey: any = firebase.database().ref().push().key;
  const user: any = useSelector(getUserSelector);
  const userInfo: any = useSelector(getUserInfoSelector);

  const [commentValue, setCommentValue] = useState('');

  const onChangeCommentValue = (value: string) => {
    setCommentValue(value);
  };

  const addComment = () => {
    firebase
      .database()
      .ref(`comments/${commentKey}`)
      .update({
        comment: commentValue,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        postId: item.id,
        userId: user.uid,
        userName: `${userInfo.firstName} ${userInfo.lastName}`,
        userImage: userInfo.userImage,
      })
      .then(() => {
        setCommentValue('');
        console.log('comment added');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Комментарий"
        multiline
        value={commentValue}
        onChangeText={onChangeCommentValue}
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
