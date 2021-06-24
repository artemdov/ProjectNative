import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import {width as w} from '../consts/size';
import {AppButtonType} from "../types/types";




export const AppButton: React.FC<AppButtonType> = ({title, onPress}) => {


    return (
        <TouchableHighlight style={styles.btn}
                          onPress={onPress}>
            <Text style={styles.textStyle}>{title}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: w - 30,
        alignItems: 'center',
        borderRadius: 30,
        paddingVertical: 10,
        backgroundColor: '#0c0c30',
        textAlign: 'center',

    },
    textStyle: {
        color: '#ffffff',

    }
});
