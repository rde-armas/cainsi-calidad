import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReportsQueueScreen from '../screens/ReportsQueueScreen';
import SchemeList from '../components/SchemeList';

const Stack = createNativeStackNavigator();

export default function ReportQueueNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name='ReportQueue' 
            component={SchemeList} 
            options={{title:'Cola de reportes'}}
        />
    </Stack.Navigator>
  );
}