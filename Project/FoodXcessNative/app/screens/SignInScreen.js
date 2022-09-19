import React, { useState, useEffect } from 'react';
import { View, Text, Platform, StatusBar, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import { Feather, AntDesign } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import * as Animatable from 'react-native-animatable';

import IPAdd from '../config/IPAdd.js'

async function saveItem(key, value) {
    await SecureStore.setItemAsync(key, value);
}

function SignInScreen({navigation, route}) {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[showpassword, setShowpassword] = useState(false);

    const handleSignIn = () => {
        fetch(`${IPAdd}/api/get-token/`).then(response => response.json()).then((data) => {
            const requestOptions = {
                method: 'POST',
                headers: {"Content-Type": "application/json", "X-CSRFToken": data['token']},
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            }

            return requestOptions
        }).then((requestOptions) => fetch(`${IPAdd}/accounts/sign-in/`, requestOptions)
        ).then(response => {
            if(response.ok){
                return response.json()
            }else{
                throw('Invalid Username or Password')
            }
        }).then(data => {
            saveItem('username', data['username'])
            alert(data['Message'])
            route.params.setUser(data['username'])
        }).catch((error) => alert(error))
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.darkGreen} barStyle='light-content' />
            <TouchableOpacity style={{position: 'absolute', left: 20, top: 30}} onPress={() => navigation.navigate('Welcome')}>
                <AntDesign name="arrowleft" size={35} color="white" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.text_header}>Sign In</Text>
            </View>
            <Animatable.View animation='slideInUp' duration={1200} style={styles.footer}>
                <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action}>
                    <Feather name='user' size={24} color={colors.darkGreen}/>
                    <TextInput placeholder='Username' style={styles.textInput} autoCapitalize='none' value={username} onChangeText={(val)=> setUsername(val) }/>
                </View>
                <Text style={[styles.text_footer, {
                    marginTop: 35,
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather name='lock' size={24} color={colors.darkGreen}/>
                    <TextInput placeholder='Password' style={styles.textInput} autoCapitalize='none' secureTextEntry={!showpassword} value={password} onChangeText={(val)=> setPassword(val)}/>
                    <TouchableOpacity onPress={()=> setShowpassword(!showpassword)}>
                        <Feather name={showpassword?'eye': 'eye-off'} size={24} color='grey' />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                        <Text style={styles.textSign}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Sign Up')} style={[styles.button, {
                        marginTop: 15,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: colors.lightGreen,
                    }]}>
                        <Text style={[styles.textSign, {
                            color: colors.lightGreen
                        }]} >Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    action:{
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
        paddingBottom: 5,
    },
    backButton:{

    },
    button: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: colors.lightGreen,
        elevation: 5,
    },
    buttonWrapper:{
        alignItems:'center',
        marginTop: 60,
    },
    container: {
        flex: 1,
        // top: Platform.OS === 'android'? StatusBar.currentHeight: 0,
        backgroundColor: colors.darkGreen,
    },
    footer:{
        flex: 3,
        backgroundColor: '#fff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    text_footer: {
        color: colors.darkGreen,
        fontSize: 18,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -6,
        paddingLeft: 10,
        color: '#05375a',
    },
    textSign: {
        fontSize: 14, 
        fontWeight: 'bold', 
        color: '#fff'
    },
})

export default SignInScreen;