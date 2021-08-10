import React from 'react';
import {StyleSheet, Image, TouchableOpacity, Text, View} from 'react-native';


export const ImageBlock: React.FC<any> = ({data}) => {

    const imageURL = data.image_id
    const image = `https://www.artic.edu/iiif/2/${imageURL}/full/843,/0/default.jpg`
    console.log('imageURL', data)
    const {imageName, imageBlock, ImageContainer, imageView} = styles

    return (
        <TouchableOpacity onPress={data.onPress}>
            <View style={ImageContainer}>
                <View style={imageView}>
                    <Image style={imageBlock}
                           source={{uri: image}}/>
                </View>
                <Text style={imageName}>{data.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ImageContainer: {
        width: '50%',
        paddingVertical: 10
    },
    imageName: {
        fontSize: 15,
        justifyContent: 'center',
        textAlign: 'center',
        width: 150,
        marginBottom: 20,
        marginLeft: 40,
        paddingTop: 10
    },
    imageBlock: {
        width: 400,
        height: 450,
        borderRadius: 10,
    },
    imageView: {
        shadowColor: '#000',
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.6,
        backgroundColor: '#fff',
        borderRadius: 10
    }

});
