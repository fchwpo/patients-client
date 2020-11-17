import * as React from "react"
import { PatientsInfo } from './PatientsInfo';

export const PatientsDesc: React.FC<{
    match: {
        params: {
            id: number | string
        }
    }
}> = (props) => {
    return (
        <PatientsInfo
            patientId={Number(props.match.params.id)}
        />
    )
}