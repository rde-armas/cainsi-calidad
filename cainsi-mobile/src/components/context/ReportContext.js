import React from "react";
import { initialInputs } from '../../utils/constants';

const ReportContext = React.createContext({});

function ReportProvider({children}) {
    const [reportInputs, setReportInputs] = React.useState({});

    const setReportValues = (nameReport) => {
        if (reportInputs) {
            setReportInputs(initialInputs[nameReport]);
        }
    }

    const resetReportValues = (nameReport) => {
        setReportInputs(initialInputs[nameReport]);
    };

    return (
        <ReportContext.Provider value={{
            resetReportValues,
            setReportValues,
            reportInputs,
        }}>
            {children}
        </ReportContext.Provider>
    );
}

export { ReportContext, ReportProvider };
