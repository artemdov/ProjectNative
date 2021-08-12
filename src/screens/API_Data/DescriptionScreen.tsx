import React from 'react';
import {StyleSheet, ScrollView, Text, View, SafeAreaView} from 'react-native';
import {ImageDescriptionBlock} from '../../components/ImageDescriptionBlock';
import {rem, vrem} from '../../consts/size';

export const DescriptionScreen: React.FC<any> = ({route}) => {
  const imageName = route.params.title;
  const historyItem =
    route.params.publication_history || route.params.artist_display;
  const imageURL = route.params.image_id;
  const image = `https://www.artic.edu/iiif/2/${imageURL}/full/843,/0/default.jpg`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <ImageDescriptionBlock image={image} imageURL={imageURL} />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.titleImage}>
            {imageName.toUpperCase()}
          </Text>
          <Text style={styles.textDescription}>{historyItem}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: vrem(14),
  },
  titleImage: {
    color: '#161616',
    textAlign: 'center',
    fontSize: rem(27),
    fontWeight: 'bold',
    paddingTop: vrem(3),
    paddingHorizontal: rem(10),
    width: '100%',
  },
  textDescription: {
    fontSize: rem(14),
    paddingHorizontal: rem(10),
    paddingVertical: vrem(10),
    textAlign: 'center',
  },
});
