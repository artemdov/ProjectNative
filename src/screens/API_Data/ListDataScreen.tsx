import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {ImageList} from '../../components/ImageList';
import screenNames from '../../navigation/ScreenNames';
import {
  getAPIDataSelector,
  isLoadingAPIDataSelector,
} from '../../store/selectors';
import {getAPIData, upLoadingAPIData} from '../../store/actions/API_DataAction';
import {rem} from '../../consts/size';

export const ListDataScreen: React.FC<any> = ({navigation}) => {
  const APIData: any = useSelector(getAPIDataSelector);
  const isLoadingAPIData = useSelector(isLoadingAPIDataSelector);
  const data = APIData.data;
  const dispatch = useDispatch();

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
});
