import axios from 'axios';

const localPatientsInfoCache: any = {};

export const getPatientsInfo = async (pageNo: number, sortBy: any = [], pageSize: number) => {
  let cacheKey = `${pageNo}_${pageSize}`;
  let finalSortBy: any = {};
  sortBy.forEach((cur: {
    name: string,
    type: string
  }) => {
    finalSortBy[cur.name] = cur.type.toUpperCase();
  })
  Object.keys(finalSortBy).forEach((sortKey: string) => {
    cacheKey += `${sortKey}_${finalSortBy[sortKey]}`
  })
  if (localPatientsInfoCache[cacheKey]){
    return localPatientsInfoCache[cacheKey]
  }
  const { data = {} } = await axios({
    url: "/api/patients/",
    params: {
      pageNo,
      pageSize,
      sortBy: finalSortBy
    }
  });
  return data.data
}

export const getGridSchema = () => {
    return [
        {
          name: 'name',
          displayName: 'Name',
          width: '20%',
          cellType: 'AVATAR_WITH_TEXT',
        },
        {
          name: 'age',
          displayName: 'Age',
          width: '10%'
        },
        {
          name: 'bloodtype',
          displayName: 'Blood Type',
          width: '10%'
        },
        {
          name: 'gender',
          displayName: 'Gender',
          width: '10%',
          cellType: 'STATUS_HINT',
          comparator: (a: { gender: string; }, b: { gender: string; }) => a.gender.localeCompare(b.gender),
          translate: (a: { gender: string; }) => ({
            title: a.gender,
            statusAppearance: (a.gender === 'Female') ? 'alert' : 'success'
          }),
        },
        {
          name: 'contact',
          displayName: 'Contact',
          sorting: false,
          width: '20%',
          cellType: 'WITH_META_LIST'
        },
        {
          name: 'address',
          displayName: 'Address',
          sorting: false,
          width: '20%'
        },
        {
          name: 'city',
          displayName: 'City',
          width: '10%'
        }
    ]
}