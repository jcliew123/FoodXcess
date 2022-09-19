import React, {useState} from 'react';
import {Text, View, StyleSheet, StatusBar, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import {Feather, MaterialIcons, Ionicons} from '@expo/vector-icons';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';

import colors from '../config/colors';
import IPAdd from '../config/IPAdd';

const {height, width} = Dimensions.get('screen')

function CreateFoodListingScreen({navigation, route}) {
    const [title, setTitle] = useState(route.params?.title || null)
    const [desc, setDesc] = useState(route.params?.desc || '')
    const [bestBefore, setBestBefore] = useState(route.params?.best_before || null)
    const [show, setShow] = useState(false)
    const [image, setImage] = useState(null);
    const [select, setSelect] = useState(false);
    
    const handleExpiry = (event, selectedDate) => {
        setShow(false)
        if(event['type'] == 'set'){
            setBestBefore(moment(selectedDate).format("YYYY-MM-DD"))
        }
    }
    
    const handleSubmit = () => {
        fetch(`${IPAdd}/api/get-token/`).then(response => response.json()).then((data) => {
            return {
                method: 'POST',
                headers: {"Content-Type": "application/json", "X-CSRFToken": data['token']},
                body: JSON.stringify({
                    title: title,
                    description: desc,
                    best_before: bestBefore?moment(bestBefore).format("YYYY-MM-DD"): null,
                })
            }
        }).then((requestOptions) => {
            if(route.params.mode == 'create'){
                createFoodListing(requestOptions)
            }else{
                editFoodListing(requestOptions)
            }
        })
    }

    const createFoodListing = (requestOptions) => {
        fetch(`${IPAdd}/api/create-foodlist/`, requestOptions).then((response) => {
            if(response.ok){
                route.params?.onRefresh();
                navigation.navigate('Own Food Listing')
            }else{
                throw response.json()
            }
        }).catch((error) => console.log(error)); 
    }

    const editFoodListing = (requestOptions) => {
        fetch(`${IPAdd}/api/foodlist/${route.params.code}/`, requestOptions).then((response) => {
            if(response.ok){
                route.params?.onRefresh();
                navigation.navigate('Own Food Listing')
            }else{
                throw response.json()
            }
        }).catch((error) => console.log(error));
    }

    const renderCreate = () => {
        return (<>
            <Feather name="plus" size={24} color='white' style={{marginRight: 5}}/>
            <Text style={{color: 'white', fontWeight:'bold', fontSize: 17}} >Create</Text>
        </>)
    }

    const renderEdit = () => {
        return (<>
            <MaterialIcons name="done" size={24} color= 'white' style={{marginRight: 5}}/>
            <Text style={{color: 'white', fontWeight:'bold', fontSize: 17}} >Done</Text>
        </>)
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
                    <TouchableOpacity style={styles.button} onPress={() => cameraImage()}>
                        <View style={{flexDirection: 'row'}}>
                            <Ionicons name="camera-outline" size={27} color={colors.lightGreen} style={{marginRight: 5}}/>
                            <Text style={{fontSize: 'bold', fontSize: 19, color: colors.lightGreen}}>Camera</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
                        <View style={{flexDirection: 'row'}}>
                            <Ionicons name="ios-image-outline" size={25} color={colors.lightGreen} style={{marginRight: 5}}/>
                            <Text style={{fontSize: 'bold', fontSize: 19, color: colors.lightGreen}}>Select from gallery</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.sand} barStyle='dark-content'/>
            <View style={styles.header}>
                <TouchableOpacity style={styles.closeButton} onPress={()=> navigation.goBack()}>
                    <Feather name='x' size={30} color='black'/>
                </TouchableOpacity>
            </View>
            <View style={styles.title}>
                <TextInput placeholder='Title' value={title} onChangeText={(val)=> setTitle(val)} style={{height: '100%', width: '100%', fontSize: 25, paddingLeft: 15, backgroundColor: 'white'}}/>
            </View>

            <View style={[styles.title, {height: 150}]}>
                <TextInput placeholder='Description' value={desc} onChangeText={(val)=> setDesc(val)} multiline={true} style={{height: '100%', width: '100%', fontSize: 20, padding: 10, textAlignVertical: 'top', backgroundColor: 'white'}}/>
            </View>

            <TouchableOpacity style={styles.date} onPress={() => setShow(true)}>
                <Text style={{fontSize: 18, color:(bestBefore? 'black': colors.grey)}}>{bestBefore? bestBefore: 'No Expiry Date'}</Text>
                {show && (<DateTimePicker 
                    mode='date'
                    display='spinner'
                    value={new Date()}
                    onChange={handleExpiry}
                    minimumDate={new Date()}
                />)}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.image} onPress={() => setSelect(true)}>
                <Feather name='camera' size={24} color={colors.lightGreen} />
                <Text style={{color: colors.grey, fontSize: 18}}>{image?"Image Selected" : "Insert Image"}</Text>
            </TouchableOpacity>

            <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
                    {route.params.mode == 'create'? renderCreate(): renderEdit()}
                </TouchableOpacity>
            </View>
            {select && renderSelect()}
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
        height: 60, 
        width: 300, 
        borderWidth: 1, 
        borderColor: colors.lightGreen, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: colors.sand,
        padding: 20,
    },
    closeButton: {
        height:50, 
        width: 50, 
        borderRadius: 25, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    date: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.lightGreen,
        paddingLeft: 10,
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: 'white'
    },
    doneButton:{
        height: 40, 
        width: 120, 
        flexDirection: 'row',
        backgroundColor: colors.lightGreen, 
        elevation: 5, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 5, 
        borderRadius: 20
    },
    header:{
        width: '100%',
        height: 60,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    image:{
        height: 150,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'white'
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
    title:{
        height: 60, 
        width: '100%', 
        marginBottom: 15, 
        borderWidth:1, 
        borderColor: colors.lightGreen
    },
})

export default CreateFoodListingScreen;