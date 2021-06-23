import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';


export const AppInput = ({onChangeText, value, label, icon}) => {


    return (
        <View style={styles.container}>
            {label && <Text>{label}</Text>}

            <View style={styles.wrapper}>
                <View>{icon && icon}</View>

                <TextInput style={styles.textInput}
                           onChangeText={onChangeText}
                           value={value}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 42,
        backgroundColor: '#00ff7f',
        borderRadius: 10
    },
    wrapper: {

    },
    textInput: {}
});
