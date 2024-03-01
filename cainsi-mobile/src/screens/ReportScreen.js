import React from 'react';
import { View, Alert } from 'react-native';
import { ReportContextApp } from '../components/context/AppContext';
import { MedicionEspesoresScreen } from './reports/MedicionEspesoresScreen'; 
import Empty from './reports/Empty';

export default function ReportScreen(props) {
    const { navigation } = props;
    const { report } = React.useContext(ReportContextApp);

    const showAlert = () => {
        Alert.alert(
            "Alerta",
            "Por favor selecciona un reporte",
            [{ text: "OK" }]
        );
    };

    // Renderizar el componente correspondiente según el valor de 'report'
    const renderReportComponent = () => {
        switch (report) {
            case "medicionEspesores":
                console.log(report);
                return <MedicionEspesoresScreen navigation={ navigation }/>;
            case "empty":
                return <Empty/>;
            default:
                showAlert();
                return null;
        }
    };

    return (
        <View>
            {renderReportComponent()}
        </View>
    );
}
