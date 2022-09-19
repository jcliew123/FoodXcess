import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { FontAwesome5  } from '@expo/vector-icons';

import colors from '../config/colors';
import IPAdd from '../config/IPAdd';

import Fruit from '../assets/fruit.svg';
import Vegetable from '../assets/vegetable.svg';
import Meat from '../assets/meat.svg';
import Seafood from '../assets/seafood.svg';
import ColdCuts from '../assets/cold_cuts.svg';
import Dairy from '../assets/dairy.svg';
import Bread from '../assets/bread.svg';
import Biscuits from '../assets/biscuits.svg';
import Alcohol from '../assets/alcohol.svg';
import Beverage from '../assets/beverages.svg';
import Tea from '../assets/tea.svg';
import Snacks from '../assets/snacks.svg';
import Condiments from '../assets/condiments.svg';
import DryGoods from '../assets/dry_goods.svg';
import Nuts from '../assets/nuts.svg';
import Canned from '../assets/canned_food.svg';
import Cereals from '../assets/cereals.svg';
import Leftovers from '../assets/leftovers.svg';
import EasyMeal from '../assets/easy_meal.svg';
import BakingGood from '../assets/baking_goods.svg';
import OtherGood from '../assets/other_goods.svg';

function Ingredient({name, expiry_date, quantity, unit, location, category, remaining, id, onPress, onRefresh}) {

    const handleDelete = () => {
        fetch(`${IPAdd}/api/get-token/`).then(response => response.json()).then((data) => {
            return fetch(`${IPAdd}/api/ingredient/${id}/`, {method:'DELETE', headers:{"X-CSRFToken": data['token']}})
        }).then(response => {
            if(response.ok){
                alert('Ingredient Consumed')
                onRefresh();
            }
        })
    }

    const renderCategory = () => {
        switch(category){
            case 'Fruits':
                return <Fruit width={50} height={50}/>
            case 'Vegetables':
                return <Vegetable width={50} height={50}/>
            case 'Meat':
                return <Meat width={50} height={50}/>
            case 'Seafood':
                return <Seafood width={50} height={50}/>
            case 'Cold cuts':
                return <ColdCuts width={50} height={50}/>
            case 'Dairy':
                return <Dairy width={50} height={50}/>
            case 'Bread':
                return <Bread width={50} height={50}/>
            case 'Cake & biscuits':
                return <Biscuits width={50} height={50}/>
            case 'Alcoholic beverages':
                return <Alcohol width={50} height={50}/>
            case 'Beverages':
                return <Beverage width={50} height={50}/>
            case 'Coffee & tea':
                return <Tea width={50} height={50}/>
            case 'Snacks':
                return <Snacks width={50} height={50}/>
            case 'Condiments & dips':
                return <Condiments width={50} height={50}/>
            case 'Dry goods':
                return <DryGoods width={50} height={50}/>
            case 'Nuts & seeds':
                return <Nuts width={50} height={50}/>
            case 'Canned food':
                return <Canned width={50} height={50}/>
            case 'Cereals':
                return <Cereals width={50} height={50}/>
            case 'Leftovers':
                return <Leftovers width={50} height={50}/>
            case 'Easy meals':
                return <EasyMeal width={50} height={50}/>
            case 'Baking goods':
                return <BakingGood width={50} height={50}/>
            case 'Other goods':
                return <OtherGood width={50} height={50}/>
            default:
                return <></>
        }   
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.progressWrapper}>
                <ProgressCircle 
                    percent={remaining}
                    radius={15}
                    borderWidth={5}
                    color={colors.lightGreen}
                    shadowColor={colors.grey}
                    bgColor='white'
                />
            </View>
            <View style={styles.nameWrapper}>
                <Text>{name}</Text>
                <Text numberOfLines={1} style={{marginTop: 10}}>{expiry_date? expiry_date: 'No Expiry Date'} • {quantity} {unit}</Text>
            </View>
            <View style={styles.locationWrapper} >
                <Text style={{marginTop: 10}}>{location? location: 'No Location'}</Text>
                {renderCategory()}
            </View>
            <TouchableOpacity style={{position: 'absolute', top: 10, right: 15}} onPress={handleDelete}>
                <FontAwesome5 name="trash" size={20} color={colors.grey} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 110, 
        backgroundColor: 'white', 
        borderRadius: 25, 
        elevation:5, 
        padding: 10,
        flexDirection: 'row',
        marginBottom: 10,
    },
    locationWrapper:{
        flex:3, 
        flexDirection: 'column-reverse',
    },
    nameWrapper: {
        flex:7, 
        justifyContent: 'center',
    },
    progressWrapper:{
        width: 60, 
        justifyContent: 'center',
        padding: 5,
    }
})

Ingredient.defaultProps = {
    name: 'Name of the ingredient',
    remaining: 50,
    expiry_date: 'No expiry date',
    quantity: 1,
    unit: 'serving',
    location: 'location',
    category: 'category',
}

export default Ingredient;