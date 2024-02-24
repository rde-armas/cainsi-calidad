import React from "react";

const ReportContextApp = React.createContext({});

function ReportContextAppProvider({children}) {
    const [report, setReport] = React.useState(null);

    const setReportUse = (report) => {
        setReport(report);
    };

    const getReport = () => {
        return report;
    };

    const resetReport = () => {
        setReport(null); // Reinicia el reporte a null
    };

    return (
        <ReportContextApp.Provider value={{
            setReportUse,
            getReport,
            resetReport,
            report,
        }}>
            {children}
        </ReportContextApp.Provider>
    );
}

export { ReportContextApp, ReportContextAppProvider };
