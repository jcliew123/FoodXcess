import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

function StackNavigator({setUser}) {
    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen name='Welcome' component={WelcomeScreen} options={{headerShown: false}} />
                <Stack.Screen name='Sign In' component={SignInScreen} options={{headerShown: false}} initialParams={{setUser: setUser}}/>
                <Stack.Screen name='Sign Up' component={SignUpScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigator;