import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InventoryMainScreen from './InventoryMainScreen';
import AddIngredientScreen from './AddIngredientScreen';

const Stack = createNativeStackNavigator();

function InventoryScreen() {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Inventory Main'  component={InventoryMainScreen} />
            <Stack.Screen name='Add Ingredient' component={AddIngredientScreen} />
        </Stack.Navigator>
    );
}

export default InventoryScreen;