import React, { useContext, useState } from 'react'
import { Card, CardContent, CircularProgress, Button, Box, Stepper, Step, StepLabel, Grid, makeStyles } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import FormContext from '../../context/Form/FormContext'
import axios from 'axios'
import * as Yup from 'yup';

// const sleep = (time) => new Promise((acc) => setTimeout(acc, time))

const useStyles = makeStyles({
    customLabelStyle: {
      fontFamily: "Comfortaa"
    }
});

const request = async (values) => {
    const tk = new Date();
    const data = {
        Nombre: values.nombre,
        Apellido: values.apellido,
        Dni: values.dni,
        Email: values.email,
        Telefono: values.telefono,
        // Token: `ABC${tk.getHours()}${tk.getMinutes()}${tk.getSeconds()}XYZ`,
        Referidos: 0
    }

    const auth = {
        headers: {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNDkyNzU4LCJleHAiOjE2MzYwODQ3NTh9.tTONIIv436EnoUz2Aa3Z55ToOp20dJz5u5lenPm5o8M',
        },
    }

    try {
        const res = await axios.post(`http://localhost:1337/usuarios?referr=ABC19385XYZ`, data, auth)
        alert(res.data.cupon)
    } catch (error) {
        alert('Error fatal!!!!')
    }
}

export default function UserFormFormik() {

    const { dataForm, setForm } = useContext(FormContext);

    return (
        <Card style={{height:'460px'}}>
            <CardContent>
                <FormikStepper
                    initialValues={{ ...dataForm }}
                    onSubmit={async (values) => {
                        await request(values);
                        console.log('values', values)
                    }}
                >
                    <div title='Datos personales'>
                        <Box paddingBottom={1.5}>
                            <Field fullWidth name="nombre" component={TextField} label="Ingrese su nombre" variant="outlined" InputLabelProps={{style: {fontFamily:'Comfortaa', fontSize:14}}}/>
                        </Box>
                        <Box paddingBottom={1.5}>
                            <Field fullWidth name="apellido" component={TextField} label="Ingrese su apellido" variant="outlined" InputLabelProps={{style: {fontFamily:'Comfortaa', fontSize:14}}}/>
                        </Box>
                        <Box paddingBottom={1.5}>
                            <Field fullWidth type="number" name="dni" component={TextField} label="Ingrese su dni" variant="outlined" InputLabelProps={{style: {fontFamily:'Comfortaa', fontSize:14}}}/>
                        </Box>

                    </div>
                    <div title='Contacto'>
                        <Box paddingBottom={2}>
                            <Field type='email' fullWidth name="email" component={TextField} label="Ingrese su mail"  variant="outlined" InputLabelProps={{style: {fontFamily:'Comfortaa', fontSize:14}}}/>
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth type="number" name="telefono" component={TextField} label="Ingrese su telefono"  variant="outlined" InputLabelProps={{style: {fontFamily:'Comfortaa', fontSize:14}}}/>
                        </Box>

                    </div>
                </FormikStepper>
            </CardContent>
        </Card>
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
            validationSchema = {!isLastStep() 
                ? Yup.object({
                nombre: Yup.string().max(20, 'No se permiten más de 20 caracteres.').required('No es posible dejar el campo vacío.'),
                apellido: Yup.string().max(20, 'No se permiten más de 20 caracteres.').required('No es posible dejar el campo vacío.'),
                dni: Yup.number().lessThan(100000000, 'Su DNI debe ser menor a 100.000.000').moreThan(10000000, 'Su DNI debe ser mayor a 10.000.000').required('No es posible dejar el campo vacío.')
                }) 
                : Yup.object({
                email: Yup.string().email('El email ingresado es incorrecto.').required('No es posible dejar el campo vacío.'),
                telefono: Yup.number().lessThan(9999999999, 'El número ingresado no es válido.').moreThan(1111111111, 'El número ingresado no es válido.').required('No es posible dejar el campo vacío.')
                })
            }
            autoComplete='off'
        >
            { ({isSubmitting})  => (
                <Form autoComplete="off">
                    <Stepper style={{maxHeight:'80px'}} activeStep={step} alternativeLabel>
                        {childrenArray.map((child, index) => (
                            <Step key={child.props.title} completed={step > index || completed}>
                                <StepLabel classes={{label: classes.customLabelStyle}}>{child.props.title}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {currentChild}
                            
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item>
                            {step > 0 ? <Button disabled={isSubmitting} style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#4E53DB', color: isSubmitting ? '#757575' : '#FFFFFF', borderRadius:'25px', textTransform:'none', fontFamily:'Comfortaa'}} onClick={() => setStep(step - 1)}>Atras</Button> : null}
                        </Grid>
                        <Grid item>
                            <Button 
                                disabled={isSubmitting} variant='contained'
                                startIcon={isSubmitting ? <CircularProgress size='1rem'/> : null} 
                                style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#4E53DB', color: isSubmitting ? '#757575' : '#FFFFFF', borderRadius:'25px', textTransform:'none', fontFamily:'Comfortaa' }} type='submit'>
                                    {isSubmitting ? 'Enviando' : isLastStep() ? 'Enviar' : 'Siguiente'}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}