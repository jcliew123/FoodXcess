import React, {useState, useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, RefreshControl} from 'react-native';

import colors from '../config/colors';
import IPAdd from '../config/IPAdd';
import Ingredient from '../components/Ingredient';

function InventoryMainScreen({navigation}) {
    const [results, setResults] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const onRefresh = () => {
        setRefresh(true);
        fetch(`${IPAdd}/api/inventory/`).then(response => response.json()).then(data => {
            setResults(data);
        }).then(() => setRefresh(false))
    }

    useEffect(() => {
        onRefresh()
    }, [])

    const renderIngredient = () => {
        return results.map((result) => (
            <Ingredient
                key={result.id}
                id={result.id}
                name={result.name} 
                expiry_date={result.expiry_date}
                quantity={result.quantity}
                unit={result.unit}
                location={result.location}
                category={result.category}
                remaining={result.remaining}
                onRefresh={() => onRefresh()}
                onPress={() => navigation.navigate('Add Ingredient', {
                    id: result.id,
                    name: result.name,
                    expiry_date: result.expiry_date,
                    quantity: result.quantity,
                    unit: result.unit,
                    location: result.location,
                    category: result.category,
                    remaining: result.remaining,
                    mode: 'edit',
                    onRefresh: () => onRefresh(),
                })}
            />
        ))
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.sand} barStyle='dark-content'/>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 15}}>
                <View style={{height: 50, width: '83%', borderRadius:20, flexDirection: 'row', alignItems:'center', paddingLeft:10}}>          
                    <Text style={{fontSize: 33, fontWeight: 'bold', color: colors.darkGreen}}>Inventory</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Add Ingredient", {mode: 'create', onRefresh: () => onRefresh()})}>
                    <Feather name="plus" size={24} color={colors.lightGreen}/>
                </TouchableOpacity>
            </View>
            
            <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}>
                {results && renderIngredient()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
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
})

export default InventoryMainScreen;