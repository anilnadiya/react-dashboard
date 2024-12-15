// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';
import ClientTable from './ClientTable';
//import Button from 'themes/overrides/Button';
import { Box, Button, Modal } from '@mui/material';
import { useState } from 'react';
import Modalpopup from 'components/Modalpopup';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

export default function ComponentTypography() {
  const [open, setOpen] = useState(false);
  const handleOpen = () =>  setOpen(true) ;
  const handleClose = () => setOpen(false) ;

  return (
    <ComponentSkeleton>

      <Grid container spacing={12}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Client Listing</Typography>
            </Grid>
            <Grid item>
              <Button onClick={handleOpen}>Add</Button>

              <Modalpopup open={open} handleClose={handleClose} />


            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <ClientTable />
          </MainCard>
        </Grid>



      </Grid>
    </ComponentSkeleton>
  );
}
