import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReportsQueueScreen from '../screens/ReportsQueueScreen';

const Stack = createNativeStackNavigator();

export default function ReportQueueNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name='ReportQueue' 
            component={ReportsQueueScreen} 
            options={{title:'Cola de reportes'}}
        />
    </Stack.Navigator>
  );
}