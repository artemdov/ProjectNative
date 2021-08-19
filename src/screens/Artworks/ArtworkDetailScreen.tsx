import React from 'react';
import {StyleSheet, ScrollView, Text, SafeAreaView} from 'react-native';
import {ArtworkItemDetail} from '../../components/ArtworkItemDetail';
import {rem, vrem} from '../../consts/size';

export const ArtworkDetailScreen: React.FC<any> = ({route}) => {
  const imageName = route.params.title;

  const artworkDescription =
    route.params.publication_history || route.params.artist_display;

  const imageId = route.params.image_id;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ArtworkItemDetail imageId={imageId} />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.imageTitle}>
          {imageName.toUpperCase()}
        </Text>
        <Text style={styles.textDescription}>{artworkDescription}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: vrem(14),
  },
  imageTitle: {
    color: '#161616',
    textAlign: 'center',
    fontSize: rem(27),
    fontWeight: 'bold',
    paddingTop: vrem(3),
    paddingHorizontal: rem(10),
  },
  textDescription: {
    fontSize: rem(14),
    paddingHorizontal: rem(10),
    paddingVertical: vrem(10),
    textAlign: 'center',
  },
});
