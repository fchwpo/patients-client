import { Card, Grid, Pagination } from '@innovaccer/design-system';
import * as React from 'react';
import { getPatientsInfo, getGridSchema } from './util';
import { TableHeader } from './TableHeader';
import './patient-table.scss';
import { useHistory } from 'react-router-dom';
import * as PropTypes from 'prop-types';

export const PatinetsTable: React.FC<{
    title: string;
    pageSize?: number;
}> = (props) => {
    const history = useHistory();

    const { pageSize = 5 } = props;

    const [isFetching, setIsFetching] = React.useState(true);
    const [patientsInfo, setPatientsInfo] = React.useState({
        list: [],
        totalCount: 0,
    });
    const [searchText, updateSearchText] = React.useState('');
    const [currentPageNo, updatePageNo] = React.useState(1);
    const [sortingList, setSortingList] = React.useState<any>();

    const totalPages = Math.ceil(patientsInfo.totalCount / pageSize);

    React.useEffect(() => {
        setIsFetching(true);
        getPatientsInfo(currentPageNo, sortingList, pageSize, searchText)
            .then((data) => {
                setPatientsInfo({
                    list: data[0],
                    totalCount: data[1],
                });
                setIsFetching(false);
            })
            .catch((err) => {
                console.log(err);
                setIsFetching(false);
            });
    }, [currentPageNo, sortingList, searchText]);

    return (
        <div className='Table-container'>
            <div style={{ width: '95%' }}>
                <Card className='Table' shadow='medium'>
                    <div className='Table-header'>
                        <TableHeader
                            totalRecords={patientsInfo.totalCount}
                            isFetching={isFetching}
                            searchText={searchText}
                            updateSearchText={(value) => {
                                updateSearchText(value);
                                updatePageNo(1);
                            }}
                        />
                    </div>
                    <div className='Table-grid'>
                        <Grid
                            onRowClick={(data) => {
                                history.push(`/patients/${data.id}`);
                            }}
                            totalRecords={patientsInfo.totalCount}
                            sortingList={sortingList}
                            updateSortingList={(newSortingList) => {
                                setSortingList(newSortingList);
                                updatePageNo(1);
                            }}
                            type='resource'
                            size='standard'
                            draggable={true}
                            withPagination={totalPages > 1}
                            pageSize={pageSize}
                            showFilters={false}
                            schema={getGridSchema() as any}
                            loading={isFetching}
                            data={patientsInfo.list}
                        />
                    </div>
                    {totalPages > 1 && (
                        <div className='Table-pagination'>
                            <Pagination
                                page={currentPageNo}
                                totalPages={totalPages}
                                type='jump'
                                onPageChange={(newPageNo) => {
                                    updatePageNo(newPageNo);
                                }}
                            />
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};


PatinetsTable.propTypes = {
    title: PropTypes.string,
    pageSize: PropTypes.number
}