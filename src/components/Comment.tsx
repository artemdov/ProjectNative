import React from 'react';
import {View, StyleSheet} from 'react-native';
import {height as h, width as w} from '../consts/size';

export const Comment: React.FC<any> = ({userImg, userName, comment}) => {
  return (
    <View style={styles.commentBlock}>
      <View style={styles.userName}>{userImg}</View>
      <View style={styles.userName}>{userName}</View>
      <View>{comment}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  commentBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  userName: {
    margin: w / 30,
  },
  input: {
    fontSize: w / 23,
    margin: w / 30,
    borderBottomWidth: 1,
    paddingVertical: h / 150,
    paddingRight: w / 4,
  },
});
