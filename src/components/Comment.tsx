import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {height as h, rem, vrem, width as w} from '../consts/size';
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
        <View style={styles.wrapperNameWithComment}>
          <Text style={styles.userName}>{`${userName}:`}</Text>
          <Text style={styles.comment}>{comment}</Text>
        </View>
      </View>
      <Text style={styles.time}>{moment(createdAt).fromNow()}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  commentBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  wrapper: {
    marginLeft: rem(3),
    marginBottom: rem(5),
  },
  userName: {
    fontSize: rem(13),
    marginLeft: rem(4),
    fontWeight: 'bold',
  },
  wrapperNameWithComment: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  image: {
    width: rem(30),
    height: rem(30),
    borderRadius: vrem(20),
  },
  comment: {
    marginLeft: rem(3),
    padding: rem(5),
  },
  time: {
    fontSize: rem(10),
    marginBottom: rem(10),
  },
});
