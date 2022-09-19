import React, {useState} from 'react';
import { View, StatusBar, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';
import {Feather, Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Slider} from '@miblanchard/react-native-slider';
import ProgressBar from 'react-native-progress/Bar';

import colors from '../config/colors';
import CategoryPicker from '../components/CategoryPicker';
import UnitPicker from '../components/UnitPicker';
import IPAdd from '../config/IPAdd';

const {height, width} = Dimensions.get('screen')

function AddIngredientScreen({navigation, route}) {
    const [name, setName] = useState(route.params?.name || null)
    const [show, setShow] = useState(false)
    const [expiryDate, setExpiryDate] = useState(route.params?.expiry_date || null)
    const [location, setLocation] = useState(route.params?.location || null)
    const [category, setCategory] = useState(route.params?.category || null);
    const [quantity, setQuantity] = useState(route.params?.quantity || 1)
    const [unit, setUnit] = useState(route.params?.unit || null);
    const [remaining, setRemaining] = useState(route.params?.remaining || 100);
    const [slider,  setSlider] = useState(false)

    const handleSubmit = () => {
        fetch(`${IPAdd}/api/get-token/`).then(response => response.json()).then((data) => {
            return {
                method: 'POST',
                headers: {"Content-Type": "application/json", "X-CSRFToken": data['token']},
                body: JSON.stringify({
                    name: name,
                    location: location,
                    category: category,
                    expiry_date: expiryDate? moment(expiryDate).format("YYYY-MM-DD"): null,
                    quantity: quantity,
                    unit: unit,
                    remaining: remaining[0],
                })
            }
        }).then(requestOptions => {
            if(route.params.mode == 'create'){
                createIng(requestOptions)
                navigation.navigate('Inventory Main')
            }else{
                editIng(requestOptions)
                navigation.navigate('Inventory Main')
            }
        })
    }

    const editIng = (requestOptions) => {
        fetch(`${IPAdd}/api/ingredient/${route.params.id}/`, requestOptions).then(response => {
            if(response.ok){
                alert("Nice")
                route.params.onRefresh();
            }else{
                alert("Invalid request");
                throw response.json();
            }
        }).catch((error) => console.log(error))
    }

    const createIng = (requestOptions) => {
        fetch(`${IPAdd}/api/add-ingredient/`, requestOptions).then((response) => {
            if(response.ok){
                alert("Nice")
                route.params.onRefresh();
            }else{
                alert("Invalid request");
                throw response.json();
            }
        }).catch((error) => console.log(error))
    }

    const handleDelete = () => {
        fetch(`${IPAdd}/api/get-token/`).then(response => response.json()).then((data) =>
            fetch(`${IPAdd}/api/ingredient/${route.params.id}/`, {method:'DELETE', headers:{"X-CSRFToken": data['token']}})
        ).then(response => {
            if(response.ok){
                alert('Ingredient Consumed')
                navigation.navigate('Inventory Main')
            }
        })
    }

    const add3Days = () => {
        setShow(false)
        setExpiryDate(moment(new Date()).add(3, 'd').format("YYYY-MM-DD"));
    }

    const add1Week = () => {
        setShow(false)
        setExpiryDate(moment(new Date()).add(1, 'w').format("YYYY-MM-DD"));
    }

    const clearExpiry = () => {
        setShow(false)
        setExpiryDate(null)
    }

    const handleExpiry = (event, selectedDate) => {
        setShow(false)
        if(event['type'] == 'set'){
            setExpiryDate(moment(selectedDate).format("YYYY-MM-DD"))
        }
    }

    const renderAdd = () => (
        <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
            <Entypo name="plus" size={24} color= 'white' style={{marginRight: 5}}/>
            <Text style={{fontWeight: 'bold', fontSize: 17, color: 'white'}}>Add</Text>
        </TouchableOpacity>
    )

    const renderEdit = () => (
        <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
            <MaterialIcons name="done" size={24} color= 'white' style={{marginRight: 5}}/>
            <Text style={{fontWeight: 'bold', fontSize: 17, color: 'white'}}>Done</Text>
        </TouchableOpacity>
    )

    const renderDelete = () => (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <FontAwesome5 name="trash" size={25} color={colors.grey} />
        </TouchableOpacity>
    )

    const renderRemaining = () => {
        return <View style={styles.remaining}>
            <TouchableOpacity style={[styles.closeButton, {position: 'absolute', top:20, right: 20}]} onPress={() => setSlider(false)}>
                <Feather name="x" size={30} color='black' />
            </TouchableOpacity>
            <Text style={{fontSize: 20, fontWeight: 'bold',marginBottom: 15}}>Remaining: {remaining}%</Text>
            <View style={{width: 220}}>
                <Slider 
                    value={remaining} 
                    onValueChange={value => setRemaining(value)} 
                    minimumValue={0} maximumValue={100} step={1}
                    maximumTrackTintColor={colors.grey}
                    minimumTrackTintColor={colors.lightGreen}
                    thumbTintColor={colors.lightGreen}
                /> 
            </View>
        </View>
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.sand} barStyle='dark-content'/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={{height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => setSlider(true)}>
                    <ProgressBar progress={remaining/100} color={colors.lightGreen} width={70} height={13} borderRadius={10} unfilledColor={colors.sand}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <Feather name="x" size={30} color='black' />
                </TouchableOpacity>
            </View>

            <View style={{alignItems: 'center', height:50, width: '100%', marginBottom: 20}}>
                <TextInput placeholder='Name' style={styles.textInput} value={name} onChangeText={(text) => setName(text)}/>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}} >
                <Text style={{fontSize: 15}}>Add to</Text>
                <ScrollView horizontal={true} style={{paddingVertical: 20}} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={[styles.locationButton, location==null?styles.selected: null]} onPress={() => setLocation(null)}>
                        <MaterialCommunityIcons name="cancel" size={20} color={location==null? 'white': colors.lightGreen} style={{marginRight: 5}}/>
                        <Text style={{color: (location==null? 'white': colors.lightGreen)}}>None</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.locationButton, location=='Freezer'?styles.selected: null]} onPress={() => setLocation('Freezer')}>
                        <FontAwesome name="snowflake-o" size={20} color={location=='Freezer'? 'white': colors.lightGreen} style={{marginRight: 5}}/>
                        <Text style={{color: (location=='Freezer'? 'white': colors.lightGreen)}}>Freezer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.locationButton, location=='Fridge'?styles.selected: null]} onPress={() => setLocation('Fridge')}>
                        <MaterialCommunityIcons name="fridge" size={20} color={location=='Fridge'? 'white': colors.lightGreen} style={{marginRight: 5}}/>
                        <Text style={{color: (location=='Fridge'? 'white': colors.lightGreen)}}>Fridge</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.locationButton, location=='Pantry'?styles.selected: null]} onPress={() => setLocation('Pantry')}>
                        <MaterialCommunityIcons name="cupboard" size={20} color={location=='Pantry'? 'white': colors.lightGreen} style={{marginRight: 5}}/>
                        <Text style={{color: (location=='Pantry'? 'white': colors.lightGreen)}}>Pantry</Text>
                    </TouchableOpacity>
                </ScrollView>

                <Text style={{fontSize: 15}}>Expiry Date: {expiryDate? expiryDate.toString(): 'No Expiry Date'}</Text>
                <View style={{width: '80%', height: 120, padding: 10, justifyContent: 'space-evenly'}}>
                    <View style={{width: '100%', height: 40, flexDirection: 'row', justifyContent: 'space-around'}} >
                        <TouchableOpacity style={styles.dateButton} onPress={add3Days}>
                            <Feather name="calendar" size={20} color={colors.lightGreen} style={{marginRight: 5}}/>
                            <Text style={{color: colors.lightGreen}}>3 Days</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dateButton} onPress={add1Week}>
                            <Feather name="calendar" size={20} color={colors.lightGreen} style={{marginRight: 5}}/>
                            <Text style={{color: colors.lightGreen}}>1 Week</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width: '100%', height: 40, flexDirection: 'row', justifyContent: 'space-around',}} >
                        <TouchableOpacity style={styles.dateButton} onPress={clearExpiry}>
                            <Feather name="calendar" size={20} color={colors.lightGreen} style={{marginRight: 5}}/>
                            <Text style={{color: colors.lightGreen}}>No Expiry Date</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dateButton} onPress={() => setShow(true)}>
                            <Feather name="calendar" size={20} color={colors.lightGreen} style={{marginRight: 5}}/>
                            <Text style={{color: colors.lightGreen}}>Custom</Text>
                        </TouchableOpacity>
                        {show && (<DateTimePicker 
                            mode='date'
                            display='spinner'
                            value={new Date()}
                            onChange={handleExpiry}
                            minimumDate={new Date()}
                        />)}
                    </View>
                    
                </View>
            </View>

            <View style={[styles.divider, {borderTopWidth: 1, borderTopColor: colors.grey}]}>
                <View style={styles.row}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>Category:</Text>
                    <CategoryPicker category={category} setCategory={setCategory}/>
                </View>
            </View>
            <View style={styles.divider}>
                <View style={styles.row}>
                    <TextInput  style={styles.quantityInput} placeholder='Quantity' keyboardType='numeric' value={quantity.toString()} onChangeText={(val) => setQuantity(val)} maxLength={3}></TextInput>
                    <UnitPicker unit={unit} setUnit={setUnit} />
                </View>    
            </View>
            <View style={{width: '100%', height: 100, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={styles.doneButton} >
                    {route.params.mode == 'create'? renderAdd():  renderEdit()}
                </TouchableOpacity>
            </View>

            {route.params.mode == 'edit'? renderDelete(): <></>}

            {slider? renderRemaining(): <></>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.sand,
        padding: 20,
    },
    closeButton: {
        height: 40, 
        width: 40, 
        justifyContent:'center', 
        alignItems: 'center', 
    },
    dateButton: {
        height: '100%', 
        width: '47%', 
        flexDirection: 'row',
        backgroundColor: 'white', 
        borderRadius: 15,
        alignItems: 'center', 
        paddingLeft: 7, 
        elevation: 5,
    },
    deleteButton:{
        position: 'absolute', 
        bottom:20, 
        right: 20, 
        height: 60, 
        width: 60, 
        borderRadius: 30, 
        backgroundColor: 'white', 
        elevation: 5, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    divider: {
        width: '100%', 
        borderBottomWidth:1, 
        borderBottomColor: colors.grey,
    },
    doneButton:{
        height: 40, 
        width: 120, 
        flexDirection: 'row',
        backgroundColor: colors.lightGreen, 
        elevation: 5, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 5, 
        borderRadius: 20
    },
    editButton: {
        height: 40, 
        width: 40, 
        elevation: 5, 
        backgroundColor: '#fff', 
        borderRadius:20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    locationButton: {
        height: 40, 
        width: 120, 
        backgroundColor: 'white', 
        borderRadius: 15, 
        elevation: 5, 
        paddingLeft: 10, 
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    quantityInput: {
        backgroundColor: colors.sand, 
        height: 40, 
        width: 100, 
        fontSize: 15, 
        borderBottomColor: colors.grey, 
        borderBottomWidth:1
    },
    remaining:{
        width: width, 
        height: 200, 
        backgroundColor: 'white', 
        borderTopRightRadius: 30, 
        borderTopLeftRadius: 30, 
        position: 'absolute', 
        bottom: 0, 
        elevation: 6, 
        padding: 10, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    row:{
        padding: 5, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    selected: {
        backgroundColor: colors.lightGreen,
    },
    textInput: {
        flex: 1,
        width: '75%',
        color: '#05375a',
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
    },
})

export default AddIngredientScreen;