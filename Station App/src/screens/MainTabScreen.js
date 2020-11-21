import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SearchScreen from './searchScreen/SearchScreen';
import CheckScreen from './checkScreen/CheckScreen';
import AccountScreen from './accountScreen/AccountScreen';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Search" component={SearchScreen} 
            options={{
                tabBarLabel: 'Tìm vé',
                tabBarIcon: ({ color }) => (
                <FontAwesome name="search" color={color} size={26} />
                ),
            }}/>
            <Tab.Screen name="Check" component={CheckScreen} 
            options={{
                tabBarLabel: 'Lịch sử',
                tabBarIcon: ({ color }) => (
                <FontAwesome name="clock-o" color={color} size={26} />
                ),
            }}/>
            <Tab.Screen name="Account" component={AccountScreen} 
            options={{
                tabBarLabel: 'Tài khoản',
                tabBarIcon: ({ color }) => (
                <FontAwesome name="user-circle" color={color} size={26} />
                ),
            }}/>
        </Tab.Navigator>
    )
 }
 export default MainTabScreen;