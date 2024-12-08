import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Fetch data function
const fetchData = async ({ page, limit }) => {
  console.log('page====>fetch', page)
  const response = await axios.get('http://localhost:5000/scoopitem', {
    params: {
      page: page + 1, // Assuming API is 1-indexed
      size: limit,
    },
  });
  console.log('response', response)
  return response.data;
};

const columns = [
  { field: 'itemId', headerName: 'Item ID', flex: 1 },
  { field: 'itemName', headerName: 'Item Name', flex: 2 },
  { field: 'emailSubject', headerName: 'Email Subject', flex: 3 },
  {
    field: 'totalAmount',
    headerName: 'Total Amount',
    flex: 1,
    renderCell: (params) => `$${params.value.toLocaleString()}`, // Formatting total amount
  },
];


export default function ScoopTable() {
  const [paginationModel, setPaginationModel] = useState({page:0, pageSize: 10})
  const [sortModel, setSortModel] = useState([])
  const [filterModel, setFilterModel] = useState({ items: [] })
  console.log('paginationModel', paginationModel)
  console.log('sortModel', sortModel)
  console.log('filterModel', filterModel)
  
  const { data, isLoading, error } = useQuery(
    {
      queryKey: ['scoopItem', paginationModel.page, paginationModel.pageSize],
      queryFn: () => fetchData({ page:paginationModel.page, limit: paginationModel.pageSize }),
      keepPreviousData: true
    }
  );

  console.log('data--ract-query', data)
  const rows = data?.data.map((item, index) => ({
    id: index,
    itemId: item.itemId,
    itemName: item.item_name,
    emailSubject: item.item_email_subject,
    totalAmount: item.total_amount,
  }));


  console.log('rows=========>', rows)

  if (isLoading) return <div > Loading... {isLoading} </div>
  if (error) return <div>Error: {error.message}</div>;

  return <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows || []}
      columns={columns || []}
      pagination
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      onSortModelChange={ sortModel }
      onFilterModelChange={filterModel}
      pageSizeOptions={[10, 20, 50]} 
      rowCount={data?.totalItems || 0}
      loading={isLoading}
      sx={{
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#f5f5f5',
        },
        '& .MuiDataGrid-row:hover': {
          backgroundColor: '#f0f0f0',
        },
      }}
    />

  </div>;
}
