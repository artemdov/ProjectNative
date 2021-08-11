import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

export const ImageDescription: React.FC<any> = ({image}) => {
  const {imageBlock, ImageContainer, mainContainer} = styles;

  return (
    <View style={mainContainer}>
      <View style={ImageContainer}>
        <Image style={imageBlock} source={{uri: image}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
