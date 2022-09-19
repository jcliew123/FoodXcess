import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity, Text, ScrollView, TextInput} from 'react-native';
import {Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';

import colors from '../config/colors';
import SearchIngredient from '../components/SearchIngredient';

function IngredientsConfirmationScreen({navigation, route}) {
    const [results, setResults] = useState(route.params?.results || [])
    const [add, setAdd] = useState(false);
    const [newIng, setNewIng] = useState('');

    const renderHeader = () => {
        return(
            <View style={styles.header}>          
                <Text style={{fontSize: 33, fontWeight: 'bold', color: colors.darkGreen}}>Confirmation</Text>
            </View>
        )
    }

    const renderInput = () => {
        return(
            <View style={[styles.header, {borderBottomColor: colors.grey, borderBottomWidth: 1}]}>
                <TextInput placeholder='Name of Ingredient' value={newIng} onChangeText={(text) => setNewIng(text)} style={{fontSize: 20}}/>
            </View>
        )
    }

    const renderResults = () => {
        return(
            results.map(item => <SearchIngredient name={item} onClick={() => deleteIng(item)}/>)
        )    
    }

    const renderEmpty = () => {
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>No Ingredient Detected</Text>
            </View>
        )
    }

    const handleAdd = () => {
        if(add){
            if(newIng.length>0){
                setResults((results) => [...results, newIng])
                setNewIng('')
            }
            setAdd(false)
        }else{
            setAdd(true)
        }
    }

    const deleteIng = (result) => {
        const arr = results.filter((item) => item !== result);
        setResults(arr);
    }

    const handleSubmit = () => {
        let out = ''
        results.map((result) => {
            out += result+' ';
        })
        // setResults([]);
        out = out.substring(0, out.length-1);
        navigation.navigate('AI Search');
        return route.params.submit(out);
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.sand} barStyle='dark-content'/>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 15}}>
                {add? renderInput(): renderHeader()}
                <TouchableOpacity style={styles.button} onPress={handleAdd}>
                    <Feather name="plus" size={24} color={colors.lightGreen}/>
                </TouchableOpacity>
            </View>
            {results.length>0?
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderResults()}
                </ScrollView>
            : renderEmpty()}
            
            <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleSubmit}>
                <MaterialIcons name="done" size={30} color={colors.lightGreen}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.navigate('AI Search')}>
                <AntDesign name="arrowleft" size={30} color={colors.lightGreen}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    addButton:{
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    backButton:{
        position: 'absolute',
        bottom: 20,
        left: 20
    },
    button:{
        height: 50, 
        width: 50, 
        elevation:5, 
        backgroundColor: '#fff', 
        justifyContent:'center', 
        alignItems: 'center', 
        borderRadius:25
    },
    container: {
        flex: 1,
        backgroundColor: colors.sand,
        padding: 20,
    },
    header:{
        height: 50, 
        width: '83%', 
        borderRadius:20, 
        flexDirection: 'row', 
        alignItems:'center', 
        paddingLeft: 5
    }
})

export default IngredientsConfirmationScreen;