import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AISearchScreen from './AISearchScreen';
import IngredientsConfirmationScreen from './IngredientsConfirmationScreen';

const Stack = createNativeStackNavigator();

function HomeScreen({navigation}) {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='AI Search' component={AISearchScreen} />
            <Stack.Screen name='Confirmation' component={IngredientsConfirmationScreen} initialParams={{submit: (out) => navigation.navigate('Recipe', {query: out})}}/>
        </Stack.Navigator>
    );
}

export default HomeScreen;