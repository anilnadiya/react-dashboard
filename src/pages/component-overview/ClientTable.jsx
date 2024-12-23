import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDeleteClientMutation } from 'api/apiSlice';

export default function ClientTable({ onEdit }) {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [sortModel, setSortModel] = useState([])
  const [filterModel, setFilterModel] = useState({ items: [] })
  const [deleteClient] = useDeleteClientMutation();
  const [selectedClient, setSelectedClient] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(null);

  // Fetch data function
  const fetchData = async ({ page, limit }) => {
    console.log('page====>fetch', page)
    const response = await axios.get('http://localhost:5000/clients', {
      params: {
        page: page + 1, // Assuming API is 1-indexed
        size: limit,
      },
    });
    console.log('response', response)
    return response.data;
  };


  const { data, isLoading, error, refetch } = useQuery(
    {
      queryKey: ['ClientItem', paginationModel.page, paginationModel.pageSize],
      queryFn: () => fetchData({ page: paginationModel.page, limit: paginationModel.pageSize }),
      keepPreviousData: true
    }
  );

  console.log('data--ract-query', data)
  const rows = data?.data.map((item, index) => ({
    id: index,
    iClientId: item.iClientId,
    vUserName: item.vUserName,
    vEmailAddress: item.vEmailAddress,
    vWebsite: item.vWebsite,
    handleEdit: onEdit
  }));


  const handleDeleteClick = (client) => {
    setSelectedClient(client)
    setOpenConfirmDialog(true)

  }

  const handleConfirmDelete = async () => {
    try {
      await deleteClient({ id: selectedClient.iClientId }).unwrap();
      setOpenConfirmDialog(false);
      setSelectedClient(null);
      refetch();


    } catch (error) {
      console.log('error', error)
    }
  }

  const handleCancelDelete = async () => {
    setOpenConfirmDialog(false);
    setSelectedClient(null)
  }


  const columns = [
    { field: 'iClientId', headerName: 'ID', flex: 1 },
    { field: 'vUserName', headerName: 'Name', flex: 2 },
    { field: 'vWebsite', headerName: 'Website', flex: 3 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <Button variant="contained" color="primary" onClick={() => params.row.handleEdit(params.row)}>
            Edit
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDeleteClick(params.row)}>
            Delete
          </Button>
        </>

      ),

    },

  ];


  if (isLoading) return <div > Loading... {isLoading} </div>
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows || []}
          columns={columns || []}
          pagination
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          onSortModelChange={(newSortModel) => sortModel(newSortModel)}
          onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
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

      </div>

      {/* confirmation diolog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to delete this client?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
}
