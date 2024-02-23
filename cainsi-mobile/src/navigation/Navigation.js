import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ReportScreen from '../screens/ReportScreen';
import ReportsQueueScreen from '../screens/ReportsQueueScreen';


const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
            }} />

            <Tab.Screen name='Report' component={ReportScreen} options={{
                tabBarLabel: "Reporte",
                tabBarIcon: ({ color, size }) => <Icon name="document" color={color} size={size} />,
                
            }}/>

            <Tab.Screen name='ReportsQueue' component={ReportsQueueScreen} options={{
                tabBarLabel: "Cola de Reportes",
                tabBarIcon: ({ color, size }) => <Icon name="albums" color={color} size={size} />,
            }} />

            <Tab.Screen name='Settings' component={SettingsScreen} options={{
                tabBarLabel: "Settings",
                tabBarIcon: ({ color, size }) => <Icon name="settings" color={color} size={size} />,
            
            }}/>
        </Tab.Navigator>
    )
}