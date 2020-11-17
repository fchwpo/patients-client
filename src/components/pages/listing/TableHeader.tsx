import {
    Input,
    Label,
    Placeholder,
    PlaceholderParagraph,
} from '@innovaccer/design-system'
import * as React from 'react'

export const TableHeader: React.FC<{
    searchText: string
    updateSearchText: (searchText: string) => void
    isFetching: boolean
    totalRecords: number
}> = ({ isFetching, searchText, totalRecords, updateSearchText }) => {
    const label = `Showing ${totalRecords || 0} items`
    return (
        <div className='Header'>
            <div className='Header-content Header-content--top'>
                <div className='Header-search'>
                    <Input
                        name='GridHeader-search'
                        icon='search'
                        placeholder={"Enter Patient's Name"}
                        onChange={(e) => {
                            updateSearchText(e.target.value)
                        }}
                        value={searchText}
                        onClear={() => updateSearchText && updateSearchText('')}
                        disabled={isFetching}
                    />
                </div>
            </div>
            <div className='Header-content Header-content--bottom'>
                {isFetching ? (
                    <Placeholder>
                        <PlaceholderParagraph length={'small'} size={'s'} />
                    </Placeholder>
                ) : (
                    <Label>{label}</Label>
                )}
            </div>
        </div>
    )
}
