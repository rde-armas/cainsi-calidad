import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import { ReportProvider } from './src/components/context/AppContext'

export default function App() {
  return (
    <ReportProvider>
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
    </ReportProvider>
  );
}
