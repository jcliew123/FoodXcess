import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {Feather} from '@expo/vector-icons';

function SearchIngredient({name, onClick}) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={{fontSize: 20, marginLeft: 5}}>{name}</Text>
            </View>
            <TouchableOpacity style={{height:20, width: 20, marginRight: 5}} onPress={onClick}>
                <Feather name="x" size={25} color='black' />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80, 
        backgroundColor: 'white', 
        borderRadius: 25, 
        elevation:5, 
        padding: 20,
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
}) 

export default SearchIngredient;