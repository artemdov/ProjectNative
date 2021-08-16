import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {rem, vrem} from '../consts/size';

export const ImageDetailScreenBlock: React.FC<any> = ({imageURL, imageId}) => {
  return (
    <View style={styles.ImageContainer}>
      {imageId ? (
        <Image style={styles.imageBlock} source={{uri: imageURL}} />
      ) : (
        <Icon
          name="md-image-outline"
          size={rem(300)}
          color="#818181"
          style={[styles.imageBlock, styles.imagePlaceholder]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    marginVertical: vrem(12),
    height: vrem(500),
    paddingHorizontal: rem(10),
    backgroundColor: '#fff',
  },
  imageBlock: {
    width: '100%',
    height: '100%',
    borderRadius: rem(12),
  },
  imagePlaceholder: {
    opacity: 0.2,
    marginLeft: rem(30),
  },
});
