import React from 'react';
import { View, Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FoodListingMainScreen from './FoodListingMainScreen';
import SavedFoodListingScreen from './SavedFoodListingScreen';
import CreateFoodListingScreen from './CreateFoodListingScreen';
import OwnFoodListingScreen from './OwnFoodListingScreen';
import FoodListingDetailsScreen from './FoodListingDetailsScreen'

const Stack = createNativeStackNavigator();

function FoodListingScreen() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Food Listing Main' component={FoodListingMainScreen}/>
            <Stack.Screen name='Saved Food Listing' component={SavedFoodListingScreen} />
            <Stack.Screen name='Create Food Listing' component={CreateFoodListingScreen} />
            <Stack.Screen name='Own Food Listing' component={OwnFoodListingScreen} />
            <Stack.Screen name='Food Listing Details' component={FoodListingDetailsScreen} />
        </Stack.Navigator>
    );
}

export default FoodListingScreen;