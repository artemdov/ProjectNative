import React from 'react';
import {StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {rem, vrem} from '../consts/size';

export const ImageList: React.FC<any> = ({data, onPress}) => {
  const imageName = data.title;
  const imageId = data.image_id;
  const imageURL = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

  return (
    <TouchableOpacity style={styles.ImageContainer} onPress={onPress}>
      {imageId ? (
        <Image style={styles.imageBlock} source={{uri: imageURL}} />
      ) : (
        <Icon
          name="md-image-outline"
          size={rem(300)}
          color="#818181"
          style={[styles.imageBlock, styles.withoutImageWrapper]}
        />
      )}
      <Text style={styles.imageTitle}>{imageName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: vrem(80),
    paddingHorizontal: rem(10),
    height: vrem(500),
  },
  imageBlock: {
    width: '100%',
    height: '100%',
    borderRadius: rem(10),
  },
  withoutImageWrapper: {
    opacity: 0.2,
    marginLeft: rem(60),
  },
  imageTitle: {
    fontSize: rem(14),
    paddingTop: vrem(8),
  },
});
