import axios from 'axios';

const checkIfValidFileType = (mimeType: string) => {
    return [
        'text/csv', //csv
        'application/vnd.ms-excel', //xls,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ].includes(mimeType);
};

export const uploadFileWithProgress = (
    e: any,
    updateStatus: (
        status: 'ERROR' | 'SUCCESS' | 'PROGRESS',
        progress?: number,
        msg?: string
    ) => void
) => {
    const finalFile = e.target.files[0];
    if (!checkIfValidFileType(finalFile.mimeType)) {
        updateStatus('ERROR', null, 'Only .csv, .xlsx & .xls files allowed');
        return;
    }
    const formData = new FormData();
    formData.append('file', finalFile);
    axios({
        method: 'POST',
        url: '/api/patients',
        data: formData,
    })
        .then(() => {
            updateStatus('SUCCESS');
        })
        .catch((e) => {
            updateStatus('ERROR');
        });
};
