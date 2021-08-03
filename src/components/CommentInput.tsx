import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {height as h, width as w} from '../consts/size';
import {useSelector} from 'react-redux';
import {getUserSelector} from '../store/selectors';
import firebase from 'firebase';

export const CommentInput: React.FC<any> = ({item}) => {
  const commentKey: any = firebase.database().ref().push().key;
  const user: any = useSelector(getUserSelector);

  const [commentValue, setCommentValue] = useState('');
  const onChangeCommentsValue = (value: string) => {
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
        userName: user.uid,
        userImage:
          'https://lh5.googleusercontent.com/' +
          '-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/' +
          'AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
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
        onChangeText={onChangeCommentsValue}
      />
      <TouchableOpacity onPress={addComment} style={styles.button}>
        <Text style={styles.buttonName}>Отправить</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#5a8efd',
    margin: w / 30,
    padding: w / 60,
  },
  buttonName: {
    fontSize: w / 35,
  },
  input: {
    fontSize: w / 23,
    margin: w / 30,
    borderBottomWidth: 1,
    paddingVertical: h / 150,
    paddingRight: w / 4,
  },
});
