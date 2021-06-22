import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';



export const AppButton = ({title, onPress}) => {


    return (
        <TouchableHighlight style={styles.btn}
                          onPress={onPress}>
            <Text style={styles.textStyle}>{title}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        width: 40,
        textAlign: 'center',
        paddingVertical: 14,
        color: 'gray',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: -0.28,
        borderRadius: 8,
    },
    textStyle: {
        color: 'white',
    }
});