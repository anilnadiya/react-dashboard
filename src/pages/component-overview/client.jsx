// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
//import { Box, Button, Modal } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';
import ClientTable from './ClientTable';

import Clientform from 'components/Clientform';
import GlobalModal from 'components/globalmodal/GlobalModal';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    background: 'white',
    borderRadius: '4px',
    padding: '20px',
    maxWidth: '500px',
    width: '90%',
    outline: 'none',
  },
};


export default function ComponentTypography() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleEdit = (client) => {
    setSelectedClient(client);
    openModal();
  }

  return (
    <ComponentSkeleton>

      <Grid container spacing={12}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Client Listing</Typography>
            </Grid>
            <Grid item>
              <Button onClick={openModal}>Add</Button>
              <GlobalModal isOpen={isModalOpen} onClose={closeModal} customStyles={customStyles}>
                <Clientform clientData={selectedClient} />
              </GlobalModal>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <ClientTable onEdit={handleEdit} />
          </MainCard>
        </Grid>
      </Grid>
    </ComponentSkeleton>
  );
}
