import React, {useState} from 'react';
import {Button, Platform, StyleSheet, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export const EditProfileScreen: React.FC<any> = () => {
    const [userData, setUserData] = useState(null);

    return (
    <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.action}>
            <FontAwesome name="user-o" color="#333333" size={20} />
            <TextInput
                placeholder="First Name"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={userData ? userData.fname : ''}
                onChangeText={(txt) => setUserData({...userData, fname: txt})}
                style={styles.textInput}
            />
        </View>
        <View style={styles.action}>
            <FontAwesome name="user-o" color="#333333" size={20} />
            <TextInput
                placeholder="Last Name"
                placeholderTextColor="#666666"
                value={userData ? userData.lname : ''}
                onChangeText={(txt) => setUserData({...userData, lname: txt})}
                autoCorrect={false}
                style={styles.textInput}
            />
        </View>
        <View style={styles.action}>
            <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
            <TextInput
                multiline
                numberOfLines={3}
                placeholder="About Me"
                placeholderTextColor="#666666"
                value={userData ? userData.about : ''}
                onChangeText={(txt) => setUserData({...userData, about: txt})}
                autoCorrect={true}
                style={[styles.textInput, {height: 40}]}
            />
        </View>
        <View style={styles.action}>
            <FontAwesome name="phone" color="#333333" size={20} />
            <TextInput
                placeholder="Phone"
                placeholderTextColor="#666666"
                keyboardType="number-pad"
                autoCorrect={false}
                value={userData ? userData.phone : ''}
                onChangeText={(txt) => setUserData({...userData, phone: txt})}
                style={styles.textInput}
            />
        </View>

        <View style={styles.action}>
            <FontAwesome name="globe" color="#333333" size={20} />
            <TextInput
                placeholder="Country"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={userData ? userData.country : ''}
                onChangeText={(txt) => setUserData({...userData, country: txt})}
                style={styles.textInput}
            />
        </View>
        <View style={styles.action}>
            <MaterialCommunityIcons
                name="map-marker-outline"
                color="#333333"
                size={20}
            />
            <TextInput
                placeholder="City"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={userData ? userData.city : ''}
                onChangeText={(txt) => setUserData({...userData, city: txt})}
                style={styles.textInput}
            />
        </View>
      <Button title="Click" onPress={() => console.log('Clicked')} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#333333',
    },
});
