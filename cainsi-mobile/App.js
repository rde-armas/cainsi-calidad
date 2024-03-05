import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import { ReportContextAppProvider } from './src/components/context/AppContext'
import { ReportProvider } from './src/components/context/ReportContext'
import { settings } from './src/utils/settings'

export default function App() {
  
  settings();

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
