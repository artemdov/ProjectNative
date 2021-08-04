import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {height as h, width as w} from '../consts/size';
import moment from 'moment';

export const Comment: React.FC<any> = ({
  userImage: userImage,
  userName: userName,
  comment,
  createdAt,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.commentBlock}>
        <Image style={styles.image} source={{uri: userImage}} />
        <Text style={styles.userName}>{`${userName}:`}</Text>
        <Text style={styles.comment}>{comment}</Text>
      </View>
      <Text style={styles.time}>{moment(createdAt).fromNow()}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  commentBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: w / 60,
  },
  wrapper: {
    marginLeft: w / 40,
    marginBottom: w / 30,
  },
  userName: {
    marginLeft: w / 90,
    fontWeight: 'bold',
  },
  image: {
    width: w / 15,
    height: h / 28,
    borderRadius: 20,
  },
  comment: {
    marginLeft: w / 90,
  },
  time: {
    fontSize: w / 40,
  },
});
