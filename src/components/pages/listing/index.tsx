import * as React from "react";
import { PatinetsTable } from "./PatientsTable";

export const PatientsListing: React.FC = () => {
    return (
        <>
        <div>
            Patients Listing
        </div>
        <PatinetsTable 
            title="Patients List"
            pageNo={1}
            pageSize={5}
            totalPages={6}
        />
        </>
    )
}