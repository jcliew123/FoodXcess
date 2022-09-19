import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FoodListingScreen from '../screens/FoodListingScreen';
import InventoryScreen from '../screens/InventoryScreen';
import RecipeScreen from '../screens/RecipeScreen';
import colors from '../config/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = ({setUser}) => {
    const getTabBarVisibility = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if( routeName == 'Ingredient Details' || routeName == 'Add Ingredient'){
            return 'none';
        }
        return 'flex';
    }

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                tabBarInactiveTintColor: 'grey',
                tabBarActiveTintColor: colors.darkGreen,
                headerShown: false,
            }}>
                <Tab.Screen name='AI Search' component={HomeScreen} options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="home" size={25} color={colors.darkGreen} />
                    )
                }} />
                <Tab.Screen name='Recipe' component={RecipeScreen} options={{
                    tabBarIcon: () => (
                        <Entypo name="open-book" size={23} color={colors.darkGreen} />
                    )
                }} />
                <Tab.Screen name='Food Listing' component={FoodListingScreen} options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="shopping" size={25} color={colors.darkGreen} />
                    )
                }} />
                <Tab.Screen name='Inventory' component={InventoryScreen} options={({route}) => ({
                    tabBarStyle: {display: getTabBarVisibility(route)},
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name='fridge' size={25} color={colors.darkGreen}/>
                    ),
                })} />
                <Tab.Screen name='Profile' component={ProfileScreen} options={{
                    tabBarIcon: () => (
                        <FontAwesome name="user" size={25} color={colors.darkGreen} />
                    )
                }} initialParams={{setUser: setUser}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default TabNavigator;