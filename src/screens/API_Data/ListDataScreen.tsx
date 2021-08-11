import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ImageBlock} from '../../components/ImageBlock';
import screenNames from '../../navigation/ScreenNames';
import {getAPIDataSelector} from '../../store/selectors';
import {getAPIData} from '../../store/actions/API_DataAction';

export const ListDataScreen: React.FC<any> = ({navigation}) => {
  useEffect(() => {
    dispatch(getAPIData());
  }, []);
  const APIData: any = useSelector(getAPIDataSelector);
  const data = APIData.data;
  const dispatch = useDispatch();
  console.log('APIdata', data);

  return (
    <View>
      <ScrollView>
        <View>
          {data &&
            data.map((item: any) => (
              <ImageBlock
                key={item.id}
                data={item}
                onPress={() => {
                  navigation.navigate(screenNames.DESCRIPTION_SCREEN, item);
                }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#30d0fe',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    width: 35,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  input: {
    width: 90,
    height: 23,
    backgroundColor: '#fff',
    fontSize: 18,
    marginLeft: 15,
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
  },
  iconSearch: {
    fontSize: 30,
    marginTop: 2,
    color: '#fff',
  },
  arrayImages: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 2,
    justifyContent: 'space-around',
    marginBottom: '30%',
  },
});
