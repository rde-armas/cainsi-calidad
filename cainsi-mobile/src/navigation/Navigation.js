import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from '../screens/HomeScreen';
import AddSchemeScreen from '../screens/AddSchemeScreen';
import ReportScreen from '../screens/ReportScreen';
import ReportsQueueNavigation from '../screens/ReportsQueueScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
                headerShown: true,
            }} />

            <Tab.Screen name='Report' component={ReportScreen} options={{
                tabBarLabel: "Reporte",
                tabBarIcon: ({ color, size }) => <Icon name="document" color={color} size={size} />,
                headerShown: true,
            }}/>

            <Tab.Screen name='ReportsQueue' component={ReportsQueueNavigation} options={{
                tabBarLabel: "Cola de Reportes",
                tabBarIcon: ({ color, size }) => <Icon name="albums" color={color} size={size} />,
                headerShown: true,
            }} />

            <Tab.Screen name='scheme' component={AddSchemeScreen} options={{
                tabBarLabel: "Esquemas",
                tabBarIcon: ({ color, size }) => <Icon name="add-circle-outline" color={color} size={size} />,
                headerShown: true,
            }}/>
        </Tab.Navigator>
    )
}