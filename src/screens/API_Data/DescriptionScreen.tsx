import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {ImageDescriptionBlock} from '../../components/ImageDescriptionBlock';

export const DescriptionScreen: React.FC<any> = ({route}) => {
  const imageName = route.params.title;
  const historyItem =
    route.params.publication_history || route.params.artist_display;
  const imageURL = route.params.image_id;
  const image = `https://www.artic.edu/iiif/2/${imageURL}/full/843,/0/default.jpg`;

  return (
    <View>
      <ScrollView>
        <View>
          <ImageDescriptionBlock image={image} imageURL={imageURL} />
          <Text>{imageName}</Text>
          <Text>{historyItem}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
