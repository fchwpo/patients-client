import * as React from 'react';

export class FileSelector extends React.Component<{
    accept: string;
    onChange: any;
    onClick?: (e: Event) => void;
}> {
    state = {
        allowMultipleImages: false,
    };

    inputElem: any = null;

    onFileUploadCB: any = null;

    triggerClick = (allowMultipleImages: boolean) => {
        if (!!allowMultipleImages != this.state.allowMultipleImages) {
            this.setState(
                {
                    allowMultipleImages,
                },
                () => {
                    this.inputElem && this.inputElem.click();
                }
            );
        } else {
            this.inputElem && this.inputElem.click();
        }
    };

    render() {
        const addInputFileProps = {};
        const acceptFileType = this.props.accept;
        return (
            <div className='file-selector-div' style={{ display: 'none' }}>
                <input
                    id='upload'
                    type='file'
                    accept={acceptFileType}
                    onChange={(e) => {
                        this.props.onChange &&
                            this.props.onChange(e, {
                                inputElem: this.inputElem,
                                onFileUploadCB: this.onFileUploadCB,
                            });
                    }}
                    onClick={(e: any) => {
                        e.stopPropagation();
                        e.target.value = null;
                        this.props.onClick && this.props.onClick(e);
                    }}
                    ref={(ref) => (this.inputElem = ref)}
                    {...addInputFileProps}
                />
            </div>
        );
    }
}
