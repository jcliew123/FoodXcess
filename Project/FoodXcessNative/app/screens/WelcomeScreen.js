import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, StatusBar, Dimensions, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';

import colors from '../config/colors';

function WelcomeScreen({navigation}) {
    return (
        <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
            <StatusBar backgroundColor={colors.darkGreen} barStyle='light-content' />
            <View style={styles.header}>
                <Text style={{fontSize: 35, fontWeight: 'bold', color: 'white'}}>FoodXcess</Text>
            </View>
            <Animatable.View animation='slideInUp' duration={800} style={styles.footer}>
                <Text style={styles.title}>Get started with FoodXcess</Text>
                <Text style={styles.text}>Sign in or create an account</Text>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
                        <Text style={styles.textSign}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign Up')}>
                        <Text style={styles.textSign}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </ImageBackground>
    );
}

const {height} = Dimensions.get('screen');
const height_logo = height*0.3;

const styles = StyleSheet.create({
    background:{
        flex: 1,
        // top: Platform.OS === 'android'? StatusBar.currentHeight: 0,
    },
    buttonWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        top: 40,
    },
    button: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: colors.lightGreen,
        elevation: 5,
    },
    footer: {
        flex: 1,
        backgroundColor: '#fbfbfb',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 30,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        width: height_logo,
        height: height_logo,
    },
    text: {
        color: 'grey',
        marginTop: 5,
    },
    title:{
        color: colors.darkGreen,
        fontSize: 25,
        fontWeight: 'bold',
    },
    textSign: {
        fontSize: 14, 
        fontWeight: 'bold', 
        color: '#fff'
    },
})

export default WelcomeScreen;