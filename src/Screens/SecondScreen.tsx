import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppButton} from '../common/AppButton';


export const SecondScreen = ({navigation}) => {


    return (
        <View style={styles.screen}>
            <AppButton title={'Вход'} onPress={() => {navigation.navigate('SecondScreen')}}/>
            <AppButton title={'Регистрация'} onPress={() => {navigation.navigate('SecondScreen')}}/>
        </View>

    )
}

const styles = StyleSheet.create({
    screen: {

    }


})
