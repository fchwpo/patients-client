import { Avatar, Card } from '@innovaccer/design-system';
import * as React from 'react'
import { getPatientInfoById } from './util';
import './patients-info.scss'

export const PatientsInfo : React.FC<{
    patientId: number
}> = ({
    patientId
}) => {
    const [patientInfo, setInfo] = React.useState(null);

    if(!patientId || isNaN(patientId)){
        return null
    }


    React.useEffect(() => {
        getPatientInfoById(patientId).then(({data}) => {
            setInfo(data.data)
        })
    }, [])

    if (!patientInfo){
        return null
    }

    return (
        <Card className="patient-info-card" shadow="medium">
            <Avatar className="patient-info-avatar" size='regular' tooltipPosition="bottom" withTooltip>
                {patientInfo.name}
            </Avatar>
            {Object.keys(patientInfo || {}).map((curItem) => {
                return (
                    <PatientInfoItem 
                        key={curItem}
                        itemKey={curItem}
                        itemValue={patientInfo[curItem]}
                    />
                )
            })}
        </Card>
    )
}

const PatientInfoItem : React.FC<{
    itemKey: string,
    itemValue: string
}> = ({
    itemKey,
    itemValue
}) => {
    return (
        <div className="info-item">
            <div className="info-key">{itemKey.toLocaleUpperCase()}</div>
            <div className="info-value">{itemValue || "-"}</div>
        </div>
    )
}