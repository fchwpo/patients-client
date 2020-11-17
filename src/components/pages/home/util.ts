import axios from "axios"

export const uploadFileWithProgress = (e, updateStatus:(status: "ERROR"|"SUCCESS"|"PROGRESS", progress? : number) => void) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0])
    axios({
        method: "POST",
        url: "/api/patients",
        data: formData,
    }).then(() => {
        updateStatus('SUCCESS')
    }).catch((e) => {
        updateStatus('ERROR')
    })
}