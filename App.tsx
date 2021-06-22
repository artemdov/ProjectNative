import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';

const App = () => {
    return (
        <SafeAreaView style={styles.screen}>
            <Text style={styles.header}>Добро пожаловать в приложение</Text>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 100,
        color: '#ffff',
    },
    screen: {
        backgroundColor: '#8a2be2',
        fontSize: 25,
        fontWeight: '700',
        width: '100%',
        height: '100%'

    },
});

export default App;
