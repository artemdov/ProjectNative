import React, {useEffect} from 'react';
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
import {ImageList} from '../../components/ImageList';
import screenNames from '../../navigation/ScreenNames';
import {
  getArtWorkAPISelector,
  getQueryValueSelector,
  isLoadingArtWorkAPISelector,
} from '../../store/selectors';
import {
  changeValue,
  getAPIData,
  getQueryData,
  upLoadingAPIData,
} from '../../store/actions/API_DataAction';
import {rem, vrem} from '../../consts/size';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ArtworkListScreen: React.FC<any> = ({navigation}) => {
  const APIData = useSelector(getArtWorkAPISelector);
  const isLoadingAPIData = useSelector(isLoadingArtWorkAPISelector);
  const queryValue = useSelector(getQueryValueSelector);
  const dispatch = useDispatch();

  const onChangeValue = (value: string) => {
    dispatch(changeValue(value));
  };
  const onClickGetQuery = () => {
    dispatch(getQueryData(queryValue));
  };

  const fetchAPIData = async () => {
    try {
      dispatch(upLoadingAPIData(true));
      await dispatch(getAPIData());
      dispatch(upLoadingAPIData(false));
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    fetchAPIData().then(() => console.log('success'));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.block}>
        <TextInput
          style={styles.input}
          placeholder={'Поиск...'}
          value={queryValue}
          onChangeText={onChangeValue}
        />
        <TouchableOpacity onPress={onClickGetQuery}>
          <View style={styles.searchButton}>
            <Ionicons name="search-circle" style={styles.iconSearch} />
          </View>
        </TouchableOpacity>
      </View>
      {isLoadingAPIData ? (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          <View style={styles.imagesList}>
            {APIData &&
              APIData.map((item: any) => (
                <ImageList
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
  imagesList: {
    marginTop: rem(20),
    flexDirection: 'column',
    justifyContent: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
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
  iconSearch: {
    fontSize: rem(40),
    color: '#fff',
  },
});
