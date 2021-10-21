import React, { useContext, useState } from 'react'
import { Card, CardContent, CircularProgress, Button, Box, Stepper, Step, StepLabel, Grid, makeStyles, Modal, Typography } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import FormContext from '../../context/Form/FormContext'
import axios from 'axios'
import * as Yup from 'yup';
import { useLocation } from "react-router-dom";
import { Scrollbar } from 'react-scrollbars-custom'
import { CopyToClipboard } from 'react-copy-to-clipboard';



// const sleep = (time) => new Promise((acc) => setTimeout(acc, time))

const useStyles = makeStyles({
    customLabelStyle: {
    }
});


export default function UserFormFormik() {
    const [openModal, setOpenModal] = useState(true);
    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)
    const [cupon, setCupon] = useState({});
    const [copyTextLink, setTextCopyLink] = useState({ copied: false });
    const [copyTextCupon, setTextCopyCupon] = useState({ copied: false });


    const { dataForm, setForm, setRegisteredUser, setStep, setFormCompleted } = useContext(FormContext);

    function useQuery() {
        return new URLSearchParams(useLocation().search)
    }

    const MessageCupon = () => {
        return (
            <Modal
                open={openModal}
                onClose={handleClose}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Card id='card-message-cupon'>
                    <Scrollbar>
                        <CardContent>
                            <Grid container
                                spacing={0}
                                direction="column"
                                alignContent="center"
                                justifyContent="center"
                                style={{ minHeight: '55vh', justifyItems:'center', alignItems:'center' }}>

                                <Grid item container direction='column' style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center', margin: '0 auto' }}>
                                    <Typography id='descriptionCupon' style={{ color: '#FFFFFF', fontSize: '22px', margin: '20px auto' }}>¡Felicidades, obtuviste tu cupón de descuento!</Typography>
                                    <Grid item style={{borderRadius: '50px', borderColor: '#14D2B9', borderWidth: '3px', borderStyle: 'solid', margin: '10px auto', padding:'10px'}}>
                                        <Typography id='cupon' style={{ color: '#FFFFFF', fontSize: '20px' }}>{`${cupon.cupon}`}</Typography>
                                    </Grid>
                                    <Typography id='descriptionLinkReferr' style={{ color: '#FFFFFF', fontSize: '18px', marginBottom: '20px',marginTop: '20px' }}>Compartí el siguiente link para sumar puntos por un premio mayor</Typography>
                                    <Grid item style={{borderRadius: '50px', borderColor: '#14D2B9', borderWidth: '3px', borderStyle: 'solid', margin: '10px auto', padding:'10px'}}>
                                        <Typography id='linkReferr' style={{ color: '#FFFFFF', fontSize: '18px' }}>{`${cupon.url_referidos}`}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid item container direction='row' style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center', width: '50%', marginTop:'30px' }}>

                                    <Grid item style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center', margin: '15px auto' }}>
                                        <CopyToClipboard
                                            text={`${cupon.cupon}`}
                                            onCopy={() => setTextCopyCupon({ ...copyTextCupon, copied: true })}
                                        >
                                            <Button
                                                id='button-cupon'
                                                variant='contained'
                                                style={{ backgroundColor: '#14D2B9', color: '#FFFFFF' }}
                                            >Copiar cupon</Button>
                                            {/* <span style={{ color: 'blue' }}>Copiar</span> */}
                                        </CopyToClipboard>
                                        {copyTextCupon.copied ? <Typography id='copyLink' style={{ color: '#FFFFFF', fontSize: '13px', margin: '5px auto' }}>Copiado.</Typography> : null}
                                    </Grid>

                                    <Grid item style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center', margin: '15px auto' }}>
                                        <CopyToClipboard
                                            text={`${cupon.url_referidos}`}
                                            onCopy={() => setTextCopyLink({ ...copyTextLink, copied: true })}
                                        >
                                            <Button
                                                id='button-cupon'
                                                variant='contained'
                                                style={{ backgroundColor: '#14D2B9', color: '#FFFFFF' }}
                                            >Copiar link</Button>
                                            {/* <span style={{ color: 'blue' }}>Copiar</span> */}
                                        </CopyToClipboard>
                                        {copyTextLink.copied ? <Typography id='copyLink' style={{ color: '#FFFFFF', fontSize: '13px', margin: '5px auto' }}>Copiado.</Typography> : null}
                                    </Grid>

                                </Grid>
                            </Grid>

                        </CardContent>

                    </Scrollbar>
                </Card>
            </Modal>
        )
    }

    const query = useQuery();

    const request = async (values) => {
        const user = {
            Nombre: values.nombre,
            Apellido: values.apellido,
            Dni: values.dni,
            Email: values.email,
            Telefono: values.telefono,
        }

        const auth = {
            headers: {
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNDkyNzU4LCJleHAiOjE2MzYwODQ3NTh9.tTONIIv436EnoUz2Aa3Z55ToOp20dJz5u5lenPm5o8M',
            },
        }

        try {
            const { data } = await axios.post(`http://localhost:1337/usuarios?referr=${query.get("referr")}`, user, auth)
            console.log(data)

            if (data.status !== 201) {
                console.log('Entre al if del error !201', data)
                throw new Error(data.type)
            }

            if (data != null) {
                setCupon({ ...data })
                handleOpen()
                setRegisteredUser(true)
            }
        } catch (error) {
            alert('Error fatal!!!!', error.message)
        }
    }


    return (
        <Grid item style={{ height: '80vh', width: '100%', justifyContent: 'center', alignContent: 'center' }}>
            <Card style={{ height: '100%', width: '100%' }}>
                <Scrollbar style={{ width: '100%', height: '100%' }}>
                    <CardContent>
                        <FormikStepper
                            initialValues={{ ...dataForm }}
                            onSubmit={async (values, helpers) => {
                                await request(values);
                                console.log('values', values)
                                helpers.resetForm()
                                setStep(0)
                                setFormCompleted(false)
                                setRegisteredUser(false)
                            }}
                        >
                            <div title='Datos personales'>
                                <Box paddingBottom={1.5}>
                                    <Field fullWidth name="nombre" component={TextField} label="Ingrese su nombre" variant="outlined" InputLabelProps={{ id: 'labelNameForm', style: { fontSize: 14 } }} />
                                </Box>
                                <Box paddingBottom={1.5}>
                                    <Field fullWidth name="apellido" component={TextField} label="Ingrese su apellido" variant="outlined" InputLabelProps={{ id: 'labelLastNameForm', style: { fontSize: 14 } }} />
                                </Box>
                                <Box paddingBottom={1.5}>
                                    <Field fullWidth type="number" name="dni" component={TextField} label="Ingrese su dni" variant="outlined" InputLabelProps={{ id: 'labelDniForm', style: { fontSize: 14 } }} />
                                </Box>

                            </div>
                            <div title='Contacto'>
                                <Box paddingBottom={2}>
                                    <Field type='email' fullWidth name="email" component={TextField} label="Ingrese su mail" variant="outlined" InputLabelProps={{ id: 'labelEmailForm', style: { fontSize: 14 } }} />
                                </Box>
                                <Box paddingBottom={2}>
                                    <Field fullWidth type="number" name="telefono" component={TextField} label="Ingrese su telefono" variant="outlined" InputLabelProps={{ id: 'labelPhoneForm', style: { fontSize: 14 } }} />
                                </Box>

                            </div>
                        </FormikStepper>
                    </CardContent>
                </Scrollbar>
            </Card>

            {openModal
                ? <MessageCupon />
                : null}
        </Grid>
    )
}




export function FormikStepper({ children, ...props }) {
    const childrenArray = React.Children.toArray(children)
    const { step, setStep, dataForm, setForm, formCompleted, setFormCompleted } = useContext(FormContext);
    const currentChild = childrenArray[step]
    // const [completed, setCompleted] = useState(false);

    const isLastStep = () => {
        return step === childrenArray.length - 1;
    }

    const classes = useStyles();

    return (
        <Formik
            {...props}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers)
                } else {
                    setStep(step + 1)
                }
            }}
            validationSchema={!isLastStep()
                ? Yup.object({
                    nombre: Yup.string().max(20, 'No se permiten más de 20 caracteres.').required('No es posible dejar el campo vacío.'),
                    apellido: Yup.string().max(20, 'No se permiten más de 20 caracteres.').required('No es posible dejar el campo vacío.'),
                    dni: Yup.number().lessThan(100000000, 'Su DNI debe ser menor a 100.000.000').moreThan(10000000, 'Su DNI debe ser mayor a 10.000.000').required('No es posible dejar el campo vacío.')
                })
                : Yup.object({
                    email: Yup.string().email('El email ingresado es incorrecto.').required('No es posible dejar el campo vacío.'),
                    telefono: Yup.number().lessThan(9999999999, 'El número ingresado no es válido.').moreThan(1100000000, 'El número ingresado no es válido.').required('No es posible dejar el campo vacío.')
                })
            }
        >
            {({ isSubmitting }) => (
                <Form autoComplete="off">
                    <Grid container direction='column' justifyContent='center' alignContent='center'>
                        <Grid item>
                            <Stepper style={{ maxHeight: '80px' }} activeStep={step} alternativeLabel>
                                {childrenArray.map((child, index) => (
                                    <Step key={child.props.title} completed={step > index || formCompleted}>
                                        <StepLabel classes={{ label: classes.customLabelStyle }}>{child.props.title}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Grid>

                        <Grid item>
                            {currentChild}
                        </Grid>

                        <Grid container spacing={2} alignContent="center" justifyContent="center" >
                            <Grid item>
                                {step > 0
                                    ? <Button
                                        id='button-form-1'
                                        disabled={isSubmitting}
                                        style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#4E53DB', color: isSubmitting ? '#757575' : '#FFFFFF' }}
                                        onClick={() => setStep(step - 1)}>Atras</Button>
                                    : null}
                            </Grid>
                            <Grid item>
                                <Button
                                    id='button-form-2'
                                    disabled={isSubmitting} variant='contained'
                                    startIcon={isSubmitting ? <CircularProgress size='1rem' /> : null}
                                    style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#4E53DB', color: isSubmitting ? '#757575' : '#FFFFFF' }} type='submit'>
                                    {isSubmitting ? 'Enviando' : isLastStep() ? 'Enviar' : 'Siguiente'}
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Form>
            )}
        </Formik>
    )
}