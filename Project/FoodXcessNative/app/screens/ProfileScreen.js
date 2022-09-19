import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, StatusBar, Text, TouchableOpacity} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { MaterialCommunityIcons, MaterialIcons, Ionicons} from '@expo/vector-icons';

import colors from '../config/colors';

function ProfileScreen({route}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser()
    }, [])

    const handleSignOut = () => {
        fetch(`${IPAdd}/api/get-token/`).then(response => response.json()).then((data) => {
            return {
                method: 'POST',
                headers: {"X-CSRFToken": data['token']},
            }
        }).then((requestOptions) => fetch(`${IPAdd}/accounts/sign-out/`, requestOptions)
        ).then(response => {
            if(response.ok){
                deleteUser();
                alert("Signed out successfully");
                route.params.setUser(null);
            }else{
                throw('Error')
            }
        }).catch((error) => alert(error))
    }

    const deleteUser = async () => {
        try{
            await SecureStore.deleteItemAsync('username')
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    const getUser = async () => {
        const userToken = await SecureStore.getItemAsync('username')
        if(userToken) {
            setUser(userToken)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.sand} barStyle='dark-content'/>
            <View style={{flexDirection: 'row', height: 70, width: '100%', alignItems: 'center', padding: 5}}>
                <Image source={require('../assets/user-icon.jpg')} style={{height: 60, width:60, borderRadius: 20}}/>
                <View style={{width: 270, height: 60, justifyContent:'center', paddingLeft:20, marginLeft:20}}>
                    <Text numberOfLines={1} style={{fontSize: 25}}>Hi {user},</Text>
                </View>
            </View>
            <View style={{flex:1, justifyContent: 'flex-end', padding: 10}}>
                <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                    <MaterialCommunityIcons name="exit-to-app" size={24} color="white" style={{marginRight: 5}}/>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>Sign Out</Text>
                </TouchableOpacity>
            </View>

            {/* <View style={{flex:1, alignItems: 'center', padding: 10, marginTop: 20}}>
                <TouchableOpacity style={[styles.button, {marginBottom: 20}]}>
                    <MaterialIcons name="bookmark-border" size={24} color="white" style={{marginRight: 5}}/>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>Saved Food Listing</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Ionicons name="md-person-outline" size={24} color="white" style={{marginRight: 5}}/>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>Your Food Listing</Text>
                </TouchableOpacity>
            </View> */}

        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%', 
        height: 55, 
        elevation:5, 
        backgroundColor: colors.darkGreen, 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingLeft: 15, 
        borderRadius: 20
    },
    container: {
        flex:1,
        padding:20,
        backgroundColor: colors.sand,
    },
})

export default ProfileScreen;