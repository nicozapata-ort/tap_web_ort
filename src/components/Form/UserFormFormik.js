import React, { useContext, useState } from 'react'
import { Card, CardContent, CircularProgress, Button, Box, Stepper, Step, StepLabel, Grid, makeStyles, Modal, Typography } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import FormContext from '../../context/Form/FormContext'
import axios from 'axios'
import * as Yup from 'yup';
import { useLocation } from "react-router-dom";


// const sleep = (time) => new Promise((acc) => setTimeout(acc, time))

const useStyles = makeStyles({
    customLabelStyle: {
        fontFamily: "Comfortaa"
    }
});


export default function UserFormFormik() {
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)
    const [cupon, setCupon] = useState({});

    const { dataForm, setForm } = useContext(FormContext);

    function useQuery() {
        return new URLSearchParams(useLocation().search)
    }

    function MessageCupon() {
        return (
            <Modal open={openModal} onClose={handleClose}>
                <Card id='card-message-cupon'>
                    <CardContent>
                        <Grid container direction="row" justifyContent='center' alignItems='center' style={{height:'55vh', justifyContent:'center', alignItems:'center'}}>
                                <Grid item style={{ textAlign: 'center', marginBottom: '8px' }}>
                                    <Typography style={{ fontFamily: 'Comfortaa Semibold', color: '#FFFFFF', fontSize:'25px' }}>{`¡Felicidades, obtuviste tu cupón de descuento: ${cupon.cupon}!`}</Typography>
                                    <br/>
                                    <Typography style={{ fontFamily: 'Comfortaa Semibold', color: '#FFFFFF', fontSize:'18px' }}>{`Compartí el siguiente link para sumar puntos por un premio mayor: ${cupon.url_referidos}!`}</Typography>
                                </Grid>
                        </Grid>
                    </CardContent>
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

            // alert('Felicidades, obtuviste tu cupón de descuento: ' + data.cupon + '\n'
            //     + 'comparte tu link para sumar puntos por un premio mayor: ' + data.url_referidos)

            if (data != null) {
                setCupon({...data})
                handleOpen()
            }
        } catch (error) {
            alert('Error fatal!!!!', error.message)
        }
    }


    return (
        <>
            <Card style={{ height: '460px' }}>
                <CardContent>
                    <FormikStepper
                        initialValues={{ ...dataForm }}
                        onSubmit={async (values, helpers) => {
                            await request(values);
                            console.log('values', values)
                            // helpers.resetForm()
                        }}
                    >
                        <div title='Datos personales'>
                            <Box paddingBottom={1.5}>
                                <Field fullWidth name="nombre" component={TextField} label="Ingrese su nombre" variant="outlined" InputLabelProps={{ style: { fontFamily: 'Comfortaa', fontSize: 14 } }} />
                            </Box>
                            <Box paddingBottom={1.5}>
                                <Field fullWidth name="apellido" component={TextField} label="Ingrese su apellido" variant="outlined" InputLabelProps={{ style: { fontFamily: 'Comfortaa', fontSize: 14 } }} />
                            </Box>
                            <Box paddingBottom={1.5}>
                                <Field fullWidth type="number" name="dni" component={TextField} label="Ingrese su dni" variant="outlined" InputLabelProps={{ style: { fontFamily: 'Comfortaa', fontSize: 14 } }} />
                            </Box>

                        </div>
                        <div title='Contacto'>
                            <Box paddingBottom={2}>
                                <Field type='email' fullWidth name="email" component={TextField} label="Ingrese su mail" variant="outlined" InputLabelProps={{ style: { fontFamily: 'Comfortaa', fontSize: 14 } }} />
                            </Box>
                            <Box paddingBottom={2}>
                                <Field fullWidth type="number" name="telefono" component={TextField} label="Ingrese su telefono" variant="outlined" InputLabelProps={{ style: { fontFamily: 'Comfortaa', fontSize: 14 } }} />
                            </Box>

                        </div>
                    </FormikStepper>
                </CardContent>
            </Card>

            {openModal
                ? MessageCupon()
                : null}
        </>
    )
}




export function FormikStepper({ children, ...props }) {
    const childrenArray = React.Children.toArray(children)
    const { step, setStep, dataForm, setForm } = useContext(FormContext);
    const currentChild = childrenArray[step]
    const [completed, setCompleted] = useState(false);

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
                    setCompleted(!completed)
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
                    <Stepper style={{ maxHeight: '80px' }} activeStep={step} alternativeLabel>
                        {childrenArray.map((child, index) => (
                            <Step key={child.props.title} completed={step > index || completed}>
                                <StepLabel classes={{ label: classes.customLabelStyle }}>{child.props.title}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {currentChild}

                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item>
                            {step > 0 ? <Button disabled={isSubmitting} style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#4E53DB', color: isSubmitting ? '#757575' : '#FFFFFF', borderRadius: '25px', textTransform: 'none', fontFamily: 'Comfortaa' }} onClick={() => setStep(step - 1)}>Atras</Button> : null}
                        </Grid>
                        <Grid item>
                            <Button
                                disabled={isSubmitting} variant='contained'
                                startIcon={isSubmitting ? <CircularProgress size='1rem' /> : null}
                                style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#4E53DB', color: isSubmitting ? '#757575' : '#FFFFFF', borderRadius: '25px', textTransform: 'none', fontFamily: 'Comfortaa' }} type='submit'>
                                {isSubmitting ? 'Enviando' : isLastStep() ? 'Enviar' : 'Siguiente'}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}