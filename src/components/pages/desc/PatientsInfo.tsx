import { Avatar, Card } from '@innovaccer/design-system';
import * as React from 'react';
import { getPatientInfoById } from './util';
import './patients-info.scss';
import * as PropTypes from 'prop-types';

export const PatientsInfo: React.FC<{
    patientId: number;
}> = ({ patientId }) => {
    const [patientInfo, setInfo] = React.useState(null);

    if (!patientId || isNaN(patientId)) {
        return null;
    }

    React.useEffect(() => {
        getPatientInfoById(patientId).then(({ data }) => {
            setInfo(data.data);
        });
    }, []);

    if (!patientInfo) {
        return null;
    }

    return (
        <Card className='patient-info-card' shadow='medium'>
            <Avatar className='patient-info-avatar' size='regular' withTooltip={false}>
                {patientInfo.name}
            </Avatar>
            {Object.keys(patientInfo || {}).map((curItem) => {
                return (
                    <PatientInfoItem
                        key={curItem}
                        itemKey={curItem}
                        itemValue={patientInfo[curItem]}
                    />
                );
            })}
        </Card>
    );
};

PatientsInfo.propTypes = {
    patientId: PropTypes.number
}

const PatientInfoItem: React.FC<{
    itemKey: string;
    itemValue: string;
}> = ({ itemKey, itemValue }) => {
    return (
        <div className='info-item'>
            <div className='info-key'>{(itemKey || "").toLocaleUpperCase()}</div>
            <div className='info-value'>{itemValue || '-'}</div>
        </div>
    );
};

PatientInfoItem.propTypes = {
    itemKey: PropTypes.string,
    itemValue: PropTypes.string
}
