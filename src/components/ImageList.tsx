import React from 'react';
import {StyleSheet, Image, TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {rem} from '../consts/size';

export const ImageList: React.FC<any> = ({data, onPress}) => {
  const imageName = data.title;
  const imageURL = data.image_id;
  const image = `https://www.artic.edu/iiif/2/${imageURL}/full/843,/0/default.jpg`;
  const {imageMame, imageBlock, ImageContainer, imageView} = styles;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={ImageContainer}>
        <View style={imageView}>
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
        <Text style={imageMame}>{imageName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  photoFeed: {
    opacity: 0.2,
    borderRadius: rem(10),
    paddingHorizontal: rem(26),
    marginBottom: rem(6),
  },
  ImageContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  imageMame: {
    fontSize: 15,
    justifyContent: 'center',
    textAlign: 'center',
    width: 150,
    marginBottom: 20,
    marginLeft: 40,
    paddingTop: 10,
  },
  imageBlock: {
    width: 400,
    height: 450,
    borderRadius: 10,
  },
  imageView: {
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.6,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});
