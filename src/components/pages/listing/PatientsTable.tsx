import { Card, Grid, Pagination } from '@innovaccer/design-system'
import * as React from 'react'
import { getPatientsInfo, getGridSchema } from './util'
import './patient-table.scss'

export const PatinetsTable : React.FC<{
    title: string,
    pageSize?: number,
}> = (props) => {

    const {
        pageSize = 5
    } = props;

    const [isFetching, setIsFetching] = React.useState(true);
    const [patientsInfo, setPatientsInfo] = React.useState({
      list: [],
      totalCount: 0
    });
    const [currentPageNo, updatePageNo] = React.useState(1);
    const [sortingList , setSortingList] = React.useState();

    const totalPages = Math.ceil(patientsInfo.totalCount / pageSize);

    React.useEffect(() => {
      setIsFetching(true);
      getPatientsInfo(currentPageNo, sortingList, pageSize).then((data) => {
        setPatientsInfo({
          list: data[0],
          totalCount: data[1]
        });
        setIsFetching(false);
      }).catch((err) => {
        console.log(err);
        setIsFetching(false);
      })
    }, [currentPageNo, sortingList]);

    return (
        <div className="Table-container">
          <div style={{ width: '95%' }}>
            <Card className="Table">
              <div className="Table-grid">
                <Grid
                    {...props}
                  sortingList={sortingList}
                  updateSortingList={(newSortingList) => {
                    setSortingList(newSortingList);
                    updatePageNo(1);
                  }}
                  type="data"
                  size='standard'
                  draggable={true}
                  withPagination={totalPages > 1}
                  pageSize={pageSize}
                  showFilters={false}
                  schema={getGridSchema()}
                  loading={isFetching}
                  data={patientsInfo.list}
                />
              </div>
              {(totalPages > 1) && (
                <div className="Table-pagination">
                  <Pagination
                    page={currentPageNo}
                    totalPages={totalPages}
                    type="jump"
                    onPageChange={(newPageNo) => {
                      updatePageNo(newPageNo);
                    }}
                  />
                </div>
              )}
            </Card>
          </div>
        </div>
    )
}