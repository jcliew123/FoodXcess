import React from 'react';
import {TouchableOpacity, View, StyleSheet, Image, Text} from 'react-native';
import { Feather } from '@expo/vector-icons';

import IPAdd from '../config/IPAdd';
import colors from '../config/colors';

function FoodListing({code, title, onPress}) {

    const handleSave = () => {
        fetch(`${IPAdd}/api/get-token/`).then(response => response.json()).then((data) => {
            return {
                method: 'POST',
                headers:{"X-CSRFToken": data['token']}
            }
        }).then((requestOptions) => {
            return fetch(`${IPAdd}/api/save-foodlist/${code}/`, requestOptions)
        }).then(response => {
            if(response.ok){
                return response.json()
            }else{
                alert('Error while saving food listing')
            }
        }).then(data => alert(data['Message']))
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={require('../assets/background.jpg')} style={{width: '100%', height: '75%', borderTopLeftRadius: 20, borderTopRightRadius: 20}} />
            <TouchableOpacity style={{position: 'absolute', top: 10, right: 15}} onPress={handleSave}>
                <Feather name="heart" size={30} color='white' />
            </TouchableOpacity>
            <View style={{flex:1, borderBottomLeftRadius:20, borderBottomRightRadius: 20, paddingLeft: 10, justifyContent: 'center'}}>
                <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 20, color: colors.darkGreen}}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        height: 180, 
        backgroundColor: '#fff', 
        elevation: 5, 
        borderRadius: 20, 
        marginBottom: 15
    }
})

FoodListing.defaultProps = {
    title: 'Title',
}

export default FoodListing;