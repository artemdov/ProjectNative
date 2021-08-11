import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import screenNames from '../../navigation/ScreenNames';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ImageDescription} from '../../components/ImageDescription';

export const DescriptionScreen: React.FC<any> = ({navigation, route}) => {
  console.log('route', route);
  const imageName = route.params.title;
  const historyItem = route.params.publication_history;
  const imageURL = route.params.image_id;
  const image = `https://www.artic.edu/iiif/2/${imageURL}/full/843,/0/default.jpg`;

  return (
    <View>
      <View>
        <TouchableOpacity>
          <Text
            onPress={() => {
              navigation.navigate(screenNames.LIST_DATA_SCREEN);
            }}>
            <Ionicons name="ios-arrow-back-sharp" />
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <ImageDescription image={image} />
          <Text>{imageName}</Text>
          <Text>{historyItem}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
