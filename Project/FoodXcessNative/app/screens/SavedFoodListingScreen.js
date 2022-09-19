import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, RefreshControl} from 'react-native';
import {Feather} from '@expo/vector-icons';

import colors from '../config/colors';
import FoodListing from '../components/FoodListing';
import IPAdd from '../config/IPAdd';

function SavedFoodListingScreen({navigation}) {
    const[results, setResults] = useState([])
    const [refresh, setRefresh] = useState(false);

    useEffect(()=> {
        retrieveResult()
    }, [])

    const retrieveResult = () => {
        fetch(`${IPAdd}/api/saved-foodlist/`).then((response) => response.json()).then((data) => setResults(data))
    }

    const renderResults = () => {
        return results.map((result) => (
            <FoodListing
                key={result.code}
                code={result.code}
                title={result.title}
                onPress={() => navigation.navigate('Food Listing Details', {
                    code: result.code, 
                    title: result.title, 
                    desc: result.description, 
                    best_before: result.best_before, 
                    created: result.created, 
                    modified: result.modified})
                }
            />
        ))
    }

    const onRefresh = () => {
        setRefresh(true);
        fetch(`${IPAdd}/api/saved-foodlist/`).then((response) => response.json()).then((data) => setResults(data)
        ).then(() => setRefresh(false))
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.sand} barStyle='dark-content'/>
            <View style={styles.header}>
                <View style={{flex: 2, height: '100%', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 33}}>Saved Food Listing</Text>
                </View>

                <TouchableOpacity style={[styles.button, {backgroundColor: colors.sand, elevation: 0}]} onPress={()=> navigation.navigate('Food Listing Main')}>
                    <Feather name='x' size={30} color='black'/>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal: 5}} refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
                {renderResults()}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50, 
        width: 50, 
        borderRadius: 25, 
        elevation:5, 
        backgroundColor: 'white', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: colors.sand,
        padding: 20,
        paddingBottom: 0
    },
    header:{
        width: '100%',
        height: 60,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    }
})

export default SavedFoodListingScreen;