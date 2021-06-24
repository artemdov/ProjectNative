import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../common/AppButton';
import {AppInput} from "../common/AppInput";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Props} from "../types/types";


export const EnterScreen: React.FC<any> = ({navigation}: any) => {

    const [changeValueEmail, setChangeValueEmail] = useState('')
    const [changeValuePassword, setChangeValuePassword] = useState('')


    return (
        <KeyboardAwareScrollView style={styles.containerKeyboard}>
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
                        onChangeText={(text: string) => setChangeValuePassword(text)}
                        secureTextEntry={true}/>
                </View>
                <AppButton title={'Вход'} onPress={() => {
                    navigation.navigate('MainScreen')
                }}/>
        </View>
        </KeyboardAwareScrollView>


    )
}

const styles = StyleSheet.create({
    containerKeyboard: {
        backgroundColor: '#8a2be2',
    },
    blockSecondScreen: {
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
