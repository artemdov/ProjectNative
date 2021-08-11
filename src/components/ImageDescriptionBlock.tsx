import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {rem} from '../consts/size';

export const ImageDescriptionBlock: React.FC<any> = ({image, imageURL}) => {
  const {imageBlock, ImageContainer, mainContainer} = styles;
  return (
    <View style={mainContainer}>
      <View style={ImageContainer}>
        {imageURL ? (
          <Image style={imageBlock} source={{uri: image}} />
        ) : (
          <Icon
            name="md-image-outline"
            size={rem(300)}
            color="#818181"
            style={styles.photoFeed}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  photoFeed: {
    opacity: 0.2,
    borderRadius: rem(10),
    paddingHorizontal: rem(26),
    marginBottom: rem(6),
  },
  mainContainer: {
    paddingVertical: 10,
  },
  ImageContainer: {
    marginTop: 10,
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.6,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  imageBlock: {
    width: 400,
    height: 450,
    borderRadius: 10,
  },
});
