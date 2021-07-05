import React from "react";
import {Image, StyleSheet, View} from "react-native";

export const Preloader = () => {
    return (
        <View>
            <Image style={styles.image} source={require('../../assets/loader.gif')}/>
        </View>
    )

}
const styles = StyleSheet.create({
    image: {
        marginHorizontal: '25%',
        marginVertical: '10%',
        width: '50%',
        height: '50%',
    },
});

