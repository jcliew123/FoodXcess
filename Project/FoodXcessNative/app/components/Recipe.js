import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Linking} from 'react-native';
import colors from '../config/colors';

function Recipe({title, ingredients, calories, image, link}) {
    const [ingredient, setIngredient] = useState('')

    const getIngredients = async () => {
        let out = '';
        ingredients.map((ing) => out += ing.food+', ')

        setIngredient(out.substring(0, out.length-2)) 
    }

    const handleOnPress = () => {
        Linking.openURL(link);
    }

    useEffect(() => {
        getIngredients()
    }, [])

    return (
        <TouchableOpacity style={styles.container} onPress={handleOnPress}>
            <Image source={{uri: image}} style={styles.image} />
            <View style={{flex:1, justifyContent: 'center', paddingLeft: 10}}>
                <Text style={{fontWeight: 'bold'}}>{title}</Text>
                <Text style={styles.subtitle}>Calories(KCal): {Math.floor(calories)}</Text>
                <Text numberOfLines={3}>Ingredients: {ingredient}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row', 
        width: '100%', 
        height: 130, 
        backgroundColor: 'white', 
        borderRadius:20, 
        elevation:7, 
        marginBottom:10, 
        padding: 10
    },
    image: {
        width:100, 
        height:100, 
        borderRadius: 5, 
        backgroundColor: 'black', 
        alignSelf: 'center'
    },
    subtitle: {
        fontSize: 12,
        color: colors.darkGreen,
    }
})

Recipe.defaultProps = {
    title: 'Title of the recipe',
    // ingredients: 'List of ingredients needed',
    calories: '0',
}

export default Recipe;