import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {height as h} from '../consts/size';
import {width as w} from '../consts/size';
import {AppInputType} from "../types/types";



export const AppInput: React.FC<AppInputType> = ({onChangeText, value, label, ...props}) => {


    return (
        <View style={styles.container}>
            {label && <Text style={styles.textInputHeader}>{label}</Text>}

            <View style={styles.wrapper}>
                <TextInput style={styles.textInput}
                           onChangeText={onChangeText}
                           value={value}
                           {...props}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: w - 30,
        paddingVertical: 11,
        height: h/3 - 150,
        backgroundColor: '#0c0c30',
        borderRadius: 10,
        margin: 10,
    },
    wrapper: {
        paddingHorizontal: 10,
    },
    textInput: {
        color: '#40e0d0',

    },
    textInputHeader: {
        color: '#40e0d0',
        marginHorizontal: 12
    }

});
