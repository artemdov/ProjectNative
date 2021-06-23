import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../common/AppButton';
import {AppInput} from "../common/AppInput";


export const SecondScreen = ({navigation}) => {

    const [changeValueEmail, setChangeValueEmail] = useState('')
    const [changeValuePassword, setChangeValuePassword] = useState('')


    return (
        <View style={styles.blockSecondScreen}>
            <Text style={styles.header}>Войдите, чтобы начать использовать приложение</Text>
            <View style={styles.containerInput}>
                <AppInput
                    label={'Email'}
                    value={changeValueEmail}
                    onChangeText={(text: string) => setChangeValueEmail(text)}
                />
                <AppInput
                    label={'Пароль'}
                    value={changeValuePassword}
                    onChangeText={(text: string) => setChangeValuePassword(text)}/>
            </View>
            <AppButton title={'Вход'} onPress={() => {
                navigation.navigate('MainScreen')
            }}/>
        </View>

    )
}

const styles = StyleSheet.create({
    blockSecondScreen: {
        backgroundColor: '#8a2be2',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    header: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 60,
        color: '#ffff',
        marginBottom: 50
    },
    containerInput: {
        marginBottom: 60
    }


})
