import { Box, Button, FormHelperText, Grid, InputLabel, Modal, OutlinedInput, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from './@extended/AnimateButton';
import { useAddClientMutation } from 'api/apiSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Modalpopup = ({ open, handleClose }) => {
    console.log('open', open)
    const [addClient] = useAddClientMutation();

    const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('values', values);
        try {
            await addClient(values).unwrap();
            resetForm();
        } catch (error) {
            console.log('error', error)
        } finally {
            setSubmitting(false)
        }

    }

    return (
        <div>

            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                                <Typography variant="h3">Create client</Typography>
                            </Stack>
                        </Grid>
                    </div>
                    <div>
                        <Formik initialValues={{ vUserName: '', vEmailAddress: '', vWebsite: '', }} validationSchema={Yup.object().shape({
                            vUserName: Yup.string(3).required("Company name is requires ")

                        })} onSubmit={handleFormSubmit} >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit} >
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} md={12}>
                                            <Stack spacing={3} >
                                                <InputLabel htmlFor="vUserName-client"> Client Name </InputLabel>
                                                <OutlinedInput id='vUserName' name='vUserName' value={values.vUserName} onBlur={handleBlur} onChange={handleChange} placeholder='Company Name' fullWidth error={Boolean(touched.vUserName && errors.vUserName)} />
                                            </Stack>
                                            {touched.vUserName && errors.vUserName && (<FormHelperText error id="helper-text-vUserNamr-client " > {errors.vUserName} </FormHelperText>)}
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <Stack spacing={3} >
                                                <InputLabel htmlFor="email-client"> Email  </InputLabel>
                                                <OutlinedInput id='vEmailAddress' name='vEmailAddress' value={values.vEmailAddress} onBlur={handleBlur} onChange={handleChange} placeholder='Email' fullWidth error={Boolean(touched.vEmailAddress && errors.vEmailAddress)} />
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <Stack spacing={3} >
                                                <InputLabel htmlFor="website-client"> Website  </InputLabel>
                                                <OutlinedInput id='vWebsite' name='vWebsite' value={values.vWebsite} onBlur={handleBlur} onChange={handleChange} placeholder='Website' fullWidth error={Boolean(touched.vWebsite && errors.vWebsite)} />
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <AnimateButton >
                                                <Button disabled={isSubmitting} fullWidth type='submit' variant='contained' color='primary'>
                                                    Save
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                    </Grid>
                                </form>
                            )}

                        </Formik>

                    </div>
                </Box>
            </Modal>
        </div>
    )
};

export default Modalpopup;