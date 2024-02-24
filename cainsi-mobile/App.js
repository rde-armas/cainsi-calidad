import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import { ReportContextAppProvider } from './src/components/context/AppContext'
import { ReportProvider } from './src/components/context/ReportContext'

export default function App() {
  return (
    <ReportProvider> 
        <ReportContextAppProvider>
          <NavigationContainer>
            <Navigation/>
          </NavigationContainer>
      </ReportContextAppProvider>
    </ReportProvider>
  );
}
