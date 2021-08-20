import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArtworkImage} from '../../components/ArtworkImage';
import screenNames from '../../navigation/ScreenNames';
import {
  getArtworksSelector,
  isLoadingArtworksSelector,
} from '../../store/selectors';
import {
  getArtworks,
  searchArtwork,
  isLoadingArtworks,
} from '../../store/actions/artworksAction';
import {rem, vrem} from '../../consts/size';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ArtworkListScreen: React.FC<any> = ({navigation}) => {
  const ArtworkData = useSelector(getArtworksSelector);
  const isLoadingArtworkData = useSelector(isLoadingArtworksSelector);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');

  const onPressSearchArtwork = async () => {
    try {
      dispatch(isLoadingArtworks(true));
      await dispatch(searchArtwork(searchValue));
      dispatch(isLoadingArtworks(false));
      setSearchValue('');
    }
    catch (er) {
      console.log(er);
    }
  };

  const fetchArtworks = async () => {
    try {
      dispatch(isLoadingArtworks(true));
      await dispatch(getArtworks());
      dispatch(isLoadingArtworks(false));
    }
    catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    fetchArtworks().then(() => console.log('success'));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={'Поиск...'}
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <TouchableOpacity onPress={onPressSearchArtwork}>
          <View style={styles.searchButton}>
            <Ionicons name="search-circle" style={styles.searchIcon} />
          </View>
        </TouchableOpacity>
      </View>
      {isLoadingArtworkData ? (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          <View style={styles.imageList}>
            {ArtworkData &&
              ArtworkData.map((item: any) => (
                <ArtworkImage
                  key={item.id}
                  data={item}
                  onPress={() => {
                    navigation.navigate(
                      screenNames.ARTWORK_DETAIL_SCREEN,
                      item,
                    );
                  }}
                />
              ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: rem(5),
  },
  imageList: {
    marginTop: rem(20),
    flexDirection: 'column',
    justifyContent: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    marginTop: vrem(30),
    paddingHorizontal: rem(20),
    width: '100%',
    height: vrem(60),
    backgroundColor: '#4f016d',
    borderRadius: rem(25),
  },
  input: {
    backgroundColor: '#fff',
    fontSize: rem(15),
    marginLeft: rem(12),
    paddingRight: rem(190),
    paddingVertical: vrem(5),
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: rem(50),
    width: rem(39),
    height: vrem(57),
    borderRadius: rem(20),
    backgroundColor: '#4f016d',
  },
  searchIcon: {
    fontSize: rem(40),
    color: '#fff',
  },
});
