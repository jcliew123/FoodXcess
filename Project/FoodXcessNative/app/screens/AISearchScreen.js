import React, {useState} from 'react';
import { View, Text, Platform, TouchableOpacity, StyleSheet, Dimensions, StatusBar, ImageBackground} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Feather, Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import IPAdd from '../config/IPAdd.js';
import colors from '../config/colors.js';

const {height, width} = Dimensions.get('screen')

function AISearchScreen({navigation, route}) {
    const [select, setSelect] = useState(false);
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [image, setImage] = useState(null);

    const uploadImage = () => {
        const fd = new FormData();
        let filename = image.uri.split('/').pop();
        fd.append('image', {
            name: filename,
            uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
            type: 'image/jpg',
        })

        navigation.navigate('Confirmation', {})

        // fetch(`${IPAdd}/api/get-token/`).then(response => response.json()).then((data) => {
        //     const requestOptions = {
        //         method: 'POST',
        //         headers: {"Content-Type": "multipart/form-data", "X-CSRFToken": data['token']},
        //         body: fd,
        //     }

        //     return requestOptions
        // }).then((requestOptions) => fetch(`${IPAdd}/api/upload/`, requestOptions))
        // .then(response => navigation.navigate('Confirmation', {results: response['results]}))
    }

    const getGalleryPermission = async () => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setGalleryPermission(galleryStatus.granted);
    }

    const getCameraPermission = async () => {
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        setCameraPermission(cameraStatus.granted);
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
    
        if (!result.cancelled) {
            setImage(result);
            setSelect(false)
        }
    };

    const cameraImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        })

        if(!result.cancelled) {
            setImage(result)
            setSelect(false)
        }
    }

    const renderSelect = () => {
        return(
            <Animatable.View animation='slideInUp' duration={800} style={styles.remaining}>
                <TouchableOpacity style={{position: 'absolute', top:20, right: 20}} onPress={() => setSelect(false)}>
                    <Feather name="x" size={30} color='black' />
                </TouchableOpacity>

                <View style={{flex: 1, justifyContent: 'space-around', padding: 10, marginTop: 20}}>
                    <TouchableOpacity style={styles.button} onPress={cameraPermission? cameraImage: getCameraPermission}>
                        <View style={{flexDirection: 'row'}}>
                            <Ionicons name="camera-outline" size={27} color="black" style={{marginRight: 5}}/>
                            <Text style={{fontSize: 'bold', fontSize: 19}}>Camera</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={galleryPermission? pickImage: getGalleryPermission}>
                        <View style={{flexDirection: 'row'}}>
                            <Ionicons name="ios-image-outline" size={25} color="black" style={{marginRight: 5}}/>
                            <Text style={{fontSize: 'bold', fontSize: 19}}>Select from gallery</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        )
    }

    const renderUpload = () => {
        return(
            <TouchableOpacity style={styles.uploadButton} onPress={() => uploadImage()}>
                <Text>Get Recipes</Text>
            </TouchableOpacity>
        )
    }

    return (
        <ImageBackground source={require('../assets/home.jpg')} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <StatusBar backgroundColor='black' barStyle='light-content'/>

            <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white' , fontWeight: 'bold', fontSize: 25}}>Upload Your Image</Text>
            </View>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={[styles.uploadButton, {marginBottom: 15}]} onPress={() => setSelect(true)}>
                    <Text>{image? 'Image Selected':'Upload Image'}</Text>
                </TouchableOpacity>
                {image && renderUpload()}
            </View>
            {select && renderSelect()}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    button:{
        height: 60, 
        width: 300, 
        borderWidth: 1, 
        borderColor: colors.darkGreen, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    remaining:{
        width: width, 
        height: 200, 
        backgroundColor: 'white', 
        borderTopRightRadius: 30, 
        borderTopLeftRadius: 30, 
        position: 'absolute', 
        bottom: 0, 
        elevation: 6, 
        padding: 10, 
        alignItems: 'center', 
        justifyContent: 'space-around',
    },
    uploadButton:{
        height: 50, 
        width: 210, 
        backgroundColor: 'white', 
        borderRadius: 20, 
        elevation: 5, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

export default AISearchScreen;