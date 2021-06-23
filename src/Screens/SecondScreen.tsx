import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {AppButton} from '../common/AppButton';
import {AppInput} from "../common/AppInput";


export const SecondScreen = ({navigation}) => {

    const [changeValue, setChangeValue] = useState('')

    return (
        <View style={styles.blockSecondScreen}>
            <Text style={styles.header}>Войдите, чтобы начать использовать приложение</Text>
            <AppInput
                icon={}
                label={'User1'}
                value={changeValue}
                onChangeText={(text: string) => setChangeValue(text)}
            />
            <AppInput
                label={'User2'}
                value={changeValue}
                onChangeText={(text: string) => setChangeValue(text)}/>
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
        height: '100%'
    },
    header: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 110,
        color: '#ffff',
    }


})
