import * as React from 'react';
import { PatientsInfo } from './PatientsInfo';
import * as PropTypes from 'prop-types';

export const PatientsDesc: React.FC<{
    match: {
        params: {
            id: number | string;
        };
    };
}> = (props) => {
    return <PatientsInfo patientId={Number(props.match.params.id)} />;
};


PatientsDesc.propTypes = {
    match: PropTypes.any
}