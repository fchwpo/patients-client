import { Button, Card, Toast } from '@innovaccer/design-system'
import * as React from 'react'
import { FileSelector } from '../../common/file-selector'
import { uploadFileWithProgress } from './util'
import './home.scss'

export const PatientsHome: React.FC = () => {
    const fileSelector: React.Ref<FileSelector> = React.useRef()

    const [toastMessage, toggleToastMessage] = React.useState({
        show: false,
        title: '',
        apperance: '',
    })

    return (
        <Card className='home-wrapper' shadow='medium'>
            <div className='file-input-wrapper'>
                <FileSelector
                    accept={'.xlsx, .xls, .csv'}
                    onChange={(e: Event) => {
                        uploadFileWithProgress(e, (status, progress) => {
                            if (status == 'SUCCESS') {
                                toggleToastMessage({
                                    show: true,
                                    title:
                                        'Uploaded File Successfully! Patients Info Added!',
                                    apperance: 'success',
                                })
                                return
                            } else if (status == 'ERROR') {
                                toggleToastMessage({
                                    show: true,
                                    title: 'Error Uploading File Please Check!',
                                    apperance: 'alert',
                                })
                                return
                            }
                        })
                    }}
                    ref={fileSelector}
                />
                <Button
                    onClick={() => {
                        toggleToastMessage({
                            show: false,
                            title: '',
                            apperance: '',
                        });
                        fileSelector.current.triggerClick(false)
                    }}
                >
                    Upload Patients File
                </Button>
                {toastMessage.show && (
                    <Toast
                        className='toast-msg'
                        {...toastMessage}
                        onClose={() => toggleToastMessage({
                            show: false,
                            title: '',
                            apperance: '',
                        })}
                    />
                )}
            </div>
        </Card>
    )
}
