import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, RefreshControl} from 'react-native';
import {Feather} from '@expo/vector-icons';

import colors from '../config/colors';
import FoodListing from '../components/FoodListing';
import IPAdd from '../config/IPAdd';

function FoodListingMainScreen({navigation}) {
    const [results, setResults] = useState([])
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{
        retrieveResult()
    }, [])

    const onRefresh = () => {
        setRefresh(true);
        fetch(`${IPAdd}/api/foodlist/`, {method: "GET"}).then((response) => response.json()).then((data) => setResults(data)
        ).then(() => setRefresh(false))
    }

    const retrieveResult = () => {
        fetch(`${IPAdd}/api/foodlist/`, {method: "GET"}).then((response) => response.json()).then((data) => setResults(data));
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
                    modified: result.modified,
                    onRefresh: () => onRefresh()
                    })
                }
            />
        ))
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.sand} barStyle='dark-content'/>
            <View style={styles.header}>
                <View style={{flex: 2, height: '100%', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 33}}>Food Listing</Text>
                </View>


                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Own Food Listing')}>
                        <Feather name="user" size={30} color={colors.lightGreen} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Saved Food Listing')}>
                        <Feather name="bookmark" size={30} color={colors.lightGreen} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal: 5}} refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />} >
                {renderResults()}
            </ScrollView>

            <TouchableOpacity style={[styles.button, styles.addButton]} onPress={() => navigation.navigate('Create Food Listing', {mode: 'create', onRefresh: () => onRefresh()})}>
                <Feather name="plus" size={30} color={colors.lightGreen}/>
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

export default FoodListingMainScreen;