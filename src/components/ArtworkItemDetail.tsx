import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {rem, vrem} from '../consts/size';
import {artworkImageUrl} from '../utils/helpers';

export const ArtworkItemDetail: React.FC<any> = ({imageId}) => {
  return (
    <View style={styles.imageContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: vrem(12),
    height: vrem(500),
    paddingHorizontal: rem(10),
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: rem(12),
  },
  imagePlaceholder: {
    opacity: 0.2,
    marginLeft: rem(30),
  },
});
