import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomButton} from '../../components/common/CustomButton';
import {useDispatch} from 'react-redux';
import {onSubmitLogOut} from '../../store/actions/authAction';
import screenNames from '../../navigation/ScreenNames';
import {height as h} from '../../consts/size';

export const FeedScreen: React.FC<any> = ({navigation}) => {
    const dispatch = useDispatch();

    const onPressLogout = () => {
        dispatch(onSubmitLogOut());
        navigation.navigate(screenNames.LANDING_SCREEN);
    };

    return (
        <View style={styles.blockMainScreen}>
            <Text style={styles.header}>Лента</Text>
            <View style={styles.buttonEnter}>
                <CustomButton title={'Выход'} onPress={onPressLogout} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    blockMainScreen: {
        backgroundColor: '#8a2be2',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    header: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 110,
        color: '#ffff',
    },
    buttonEnter: {
        marginTop: h / 2,
    },
    buttonRegistration: {
        marginTop: 12,
        paddingBottom: 120,
    },
});
