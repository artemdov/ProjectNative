import React from 'react';
import {StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {rem, vrem} from '../consts/size';
import {artworkImageUrl} from './artworkImageUrl';

export const ImageList: React.FC<any> = ({data, onPress}) => {
  const imageName = data.title;

  const imageId: any = data.image_id;

  return (
    <TouchableOpacity style={styles.imageContainer} onPress={onPress}>
      {imageId ? (
        <Image style={styles.image} source={{uri: artworkImageUrl(imageId)}} />
      ) : (
        <Icon
          name="md-image-outline"
          size={rem(300)}
          color="#818181"
          style={[styles.image, styles.imagePlaceholder]}
        />
      )}
      <Text style={styles.imageTitle}>{imageName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: vrem(80),
    paddingHorizontal: rem(10),
    height: vrem(500),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: rem(10),
  },
  imagePlaceholder: {
    opacity: 0.2,
    marginLeft: rem(60),
  },
  imageTitle: {
    fontSize: rem(14),
    paddingTop: vrem(8),
  },
});
