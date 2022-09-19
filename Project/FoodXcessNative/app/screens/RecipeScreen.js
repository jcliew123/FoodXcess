import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, StatusBar} from 'react-native';
import colors from '../config/colors';
import {FontAwesome} from '@expo/vector-icons';

import data from '../config/data';
import Recipe from '../components/Recipe';

function RecipeScreen({route}) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        setQuery(route.params?.query)
    }, [route.params?.query])

    const retrieveResult = () => {
        fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${data.app_id}&app_key=${data.app_key}&random=true`).then((response)=> {
        if(response.ok){
                return response.json();
            }else{
                alert(`Error/No recipe relevant to ${query}`)
                return response.json()
            }
        }).then((data) => {
            setResults(data.hits)
        })
    }

    const renderResults = (
        <ScrollView>
            {results.map(result => {
                return <Recipe
                    title={result.recipe.label}
                    image={result.recipe.images.THUMBNAIL.url}
                    calories={result.recipe.calories}
                    ingredients={result.recipe.ingredients}
                    link={result.recipe.url}
                />
            })}
        </ScrollView>
    )

    const defaultText = (
        <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
            <Text>Try to enter the ingredients that you have.</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.sand} barStyle='dark-content'/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                <View style={{height: 50, width: '80%'}}>
                    <TextInput placeholder='Search for recipes' style={styles.textInput} autoCapitalize='none' value={query} onChangeText={(val)=> setQuery(val)}/>
                </View>
                <TouchableOpacity onPress={retrieveResult}  style={{height: 50, width: 50, elevation:7, backgroundColor: '#fff', justifyContent:'center', alignItems: 'center', borderRadius:25}}>
                    <FontAwesome name="search" size={20} color='black' />
                </TouchableOpacity>
            </View>
            {results.length>0? renderResults: defaultText}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.sand,
        padding: 10,
    },
    textInput: {
        flex: 1,
        // marginTop: Platform.OS === 'ios' ? 0 : -6,
        paddingLeft: 10,
        color: '#05375a',
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        fontSize: 15,
    },
})

export default RecipeScreen;