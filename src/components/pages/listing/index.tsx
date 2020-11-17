import * as React from "react";
import { PatinetsTable } from "./PatientsTable";

export const PatientsListing: React.FC = () => {
    return (
        <>
        <PatinetsTable 
            title="Patients List"
        />
        </>
    )
}