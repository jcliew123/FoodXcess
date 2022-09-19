import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView} from 'react-native'
import {Feather, FontAwesome5} from '@expo/vector-icons';
import moment from 'moment';

import colors from '../config/colors';
import IPAdd from '../config/IPAdd';

function FoodListingDetailsScreen({navigation, route}) {
    const [owner, setOwner] = useState(false)

    useEffect(() => {
        retrieveOwner()
    }, [])

    const retrieveOwner = () => {
        fetch(`${IPAdd}/api/foodlist/${route.params.code}/`).then(response => response.json()).then(data => setOwner(data.owner))
    }

    const handleDelete = () => {
        fetch(`${IPAdd}/api/get-token/`).then(response => response.json()).then((data) => {
            return {
                method: 'DELETE',
                headers:{"X-CSRFToken": data['token']}
            }
        }).then((requestOptions) => {
            return fetch(`${IPAdd}/api/foodlist/${route.params.code}/`, requestOptions)
        }).then((response) => {
            if(response.status == 204){
                alert('Deleted Succesfully');
                route.params.onRefresh();
                navigation.navigate('Own Food Listing');
            }else{
                alert('Error while deleting');
            }
        })
    }

    const handleEdit = () => {
        return navigation.navigate('Create Food Listing', {mode: 'edit', code: route.params.code, title: route.params.title, desc: route.params.desc, best_before: route.params.best_before, onRefresh: () => route.params.onRefresh()})
    }

    const handleSave = () => {
        fetch(`${IPAdd}/api/get-token/`).then(response => response.json()).then((data) => {
            return {
                method: 'POST',
                headers:{"X-CSRFToken": data['token']}
            }
        }).then((requestOptions) => {
            return fetch(`${IPAdd}/api/save-foodlist/${route.params.code}/`, requestOptions)
        }).then(response => {
            if(response.ok){
                return response.json()
            }else{
                alert('Error while saving food listing')
                navigation.navigate('Food Listing Main')
            }
        }).then(data => alert(data['Message']))
    }

    const renderControl = () => {
        return(
            <>
                <View style={{position: 'absolute', bottom: 80, right: 20}}>
                    <TouchableOpacity style={[styles.button, {backgroundColor: 'white'}]} onPress={handleEdit}>
                        <Feather name="edit" size={25} color={colors.lightGreen} />
                    </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', bottom: 20, right: 20}}>
                    <TouchableOpacity style={styles.button} onPress={handleDelete}>
                        <FontAwesome5 name="trash" size={25} color='white' />
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    const renderLove = () => {
        return <View style={{position: 'absolute', bottom: 20, right: 20}}>
            <TouchableOpacity style={[styles.button, {backgroundColor: 'white'}]} onPress={handleSave}>
                <Feather name="heart" size={25} color={colors.lightGreen} />
            </TouchableOpacity>
        </View>
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.sand} barStyle='dark-content'/>
            <View style={styles.header}>
                <View style={{height: 50, width: '83%', borderRadius:20, flexDirection: 'row', alignItems:'center', paddingLeft:10}}>          
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>Details</Text>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={()=> navigation.goBack()}>
                    <Feather name='x' size={30} color='black'/>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={{width: '100%', height: 180, marginBottom: 20, borderRadius: 20}} source={require('../assets/food.jpg')}/>
                <Text style={{fontSize: 30, fontWeight:'bold', marginBottom: 10, color: colors.darkGreen}}>{route.params.title}</Text>
                <View style={styles.divider}/>
                <Text style={{fontSize: 18, marginBottom: 10, padding:5}}>{route.params.desc}</Text>
                <View style={styles.divider}/>
                <Text style={{fontSize: 18, marginBottom: 10, paddingLeft: 5}}>Best Before: {route.params.best_before? route.params.best_before: 'No Expiry Date'}</Text>
                <View style={styles.divider}/>
                <Text style={{fontSize: 15, marginBottom: 10, paddingLeft: 5}}>Created: {moment(route.params.created).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Text>
                <View style={styles.divider}/>
                <Text style={{fontSize: 15, marginBottom: 10, paddingLeft: 5}}>Modified: {moment(route.params.modified).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Text>
            </ScrollView>

            {owner? renderControl(): renderLove()}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50, 
        width: 50, 
        borderRadius: 25, 
        elevation:5, 
        backgroundColor: 'red', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: colors.sand,
        padding: 20,
        paddingBottom: 0
    },
    divider: {
        width: '100%', 
        borderBottomWidth:1, 
        borderBottomColor: colors.lightGreen,
        marginBottom: 10
    },
    header:{
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
})

export default FoodListingDetailsScreen;