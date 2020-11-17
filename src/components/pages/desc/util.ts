import axios from 'axios';

export const getPatientInfoById = (patientId: number) => {
    return axios.get(`/api/patients/${patientId}`);
};
