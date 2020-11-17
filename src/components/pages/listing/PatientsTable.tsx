import { Card, Grid, Pagination } from '@innovaccer/design-system'
import * as React from 'react'

export const PatinetsTable : React.FC<{
    title: string,
    pageSize: number,
    totalPages: number,
    pageNo: number
}> = (props) => {
    const {
        totalPages,
        pageNo,
        pageSize
    } = props;
    return (
        <div className="Table-container">
          <div style={{ width: '100%' }}>
            <Card className="Table">
              <div className="Table-header">
                {/* <Header
                  {...this.state}
                  updateSchema={this.updateSchema.bind(this)}
                  updateFilterList={this.updateFilterList.bind(this)}
                  updateSearchTerm={this.updateSearchTerm.bind(this)}
                  updateShowVerticalFilters={this.updateShowVerticalFilters.bind(this)}
                  onSelectAll={this.onSelectAll.bind(this)}
                  withCheckbox={withCheckbox}
                  withPagination={withPagination}
                /> */}
              </div>
              <div className="Table-grid">
                <Grid
                    {...props}
                //   updateData={this.updateData.bind(this)}
                //   updateSchema={this.updateSchema.bind(this)}
                //   updateSortingList={this.updateSortingList.bind(this)}
                //   updateFilterList={this.updateFilterList.bind(this)}
                //   withCheckbox={withCheckbox}
                //   onSelect={this.onSelect.bind(this)}
                //   onSelectAll={this.onSelectAll.bind(this)}
                  showMenu={true}
                  type="data"
                  size="comfortable"
                  draggable={true}
                  withPagination={totalPages > 1}
                  pageSize={pageSize}
                //   loaderSchema={loaderSchema}
                />
              </div>
              {(totalPages > 1) && (
                <div className="Table-pagination">
                  <Pagination
                    page={pageNo}
                    totalPages={totalPages}
                    type="jump"
                    onPageChange={(newPageNo) => {
                        console.log(newPageNo)
                    }}
                  />
                </div>
              )}
            </Card>
          </div>
        </div>
    )
}