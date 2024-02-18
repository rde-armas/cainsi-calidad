import React from "react";

const ReportContext = React.createContext({});

function ReportProvider({children}) {
    const [report, setReport] = React.useState(null);

    const setReportUse = (report) => {
        setReport(report);
    };

    const getReport = () => {
        return report;
    };

    return (
        <ReportContext.Provider value={{
            setReportUse,
            getReport,
            report,
        }}>
            {children}
        </ReportContext.Provider>
    );
}

export { ReportContext, ReportProvider };
