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
  getAPIDataSelector,
  getQueryValueSelector,
  isLoadingAPIDataSelector,
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
  const APIData: any = useSelector(getAPIDataSelector);
  const isLoadingAPIData = useSelector(isLoadingAPIDataSelector);
  const queryValue = useSelector(getQueryValueSelector);
  const data = APIData.data;
  console.log(data);
  const dispatch = useDispatch();

  const onChangeValue = (value: string) => {
    dispatch(changeValue(value));
  };
  const onClickGetQuery = () => {
    dispatch(getQueryData(queryValue));
  };

  const fetchAPIData = async () => {
    dispatch(upLoadingAPIData(true));
    await dispatch(getAPIData());
    dispatch(upLoadingAPIData(false));
  };

  useEffect(() => {
    fetchAPIData().then(() => console.log('success'));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.block}>
        <TextInput
          style={styles.input}
          placeholder={'Search'}
          value={queryValue}
          onChangeText={onChangeValue}
        />
        <TouchableOpacity onPress={onClickGetQuery}>
          <View style={styles.searchButton}>
            <Ionicons name="search-circle" style={styles.iconSearch} />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {isLoadingAPIData ? (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#0000ff"
          />
        ) : (
          <View style={styles.imagesList}>
            {data &&
              data.map((item: any) => (
                <ImageList
                  key={item.id}
                  data={item}
                  onPress={() => {
                    navigation.navigate(screenNames.DESCRIPTION_SCREEN, item);
                  }}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagesList: {
    marginTop: rem(20),
    flexDirection: 'column',
    justifyContent: 'center',
  },
  loader: {
    marginVertical: rem(250),
  },
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vrem(30),
    marginHorizontal: rem(50),
    width: rem(280),
    height: vrem(60),
    backgroundColor: '#8d8484',
    borderRadius: rem(20),
  },
  input: {
    backgroundColor: '#fff',
    fontSize: rem(15),
    paddingRight: rem(160),
    paddingVertical: vrem(5),
    marginLeft: rem(15),
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: rem(10),
    marginBottom: vrem(5),
    width: rem(38),
    height: vrem(50),
    borderRadius: rem(20),
    backgroundColor: '#8d8484',
  },
  iconSearch: {
    fontSize: rem(40),
    color: '#fff',
  },
});
