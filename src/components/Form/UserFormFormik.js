import React, { useContext, useState } from 'react'
import { Card, CardContent, CircularProgress, Button, Box, Stepper, Step, StepLabel, Grid } from '@material-ui/core'
import * as Yup from 'yup';


import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'
import FormContext from '../../context/Form/FormContext'

const sleep = (time) => new Promise((acc) => setTimeout(acc, time))

export default function UserFormFormik() {

    const { dataForm, setForm } = useContext(FormContext);

    return (
        <Card>
            <CardContent>
                <FormikStepper
                    initialValues={{ ...dataForm }}
                    onSubmit={async (values) => {
                        await sleep(3000);
                        console.log('values', values)
                    }}
                >
                    <div title='Datos personales'>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="nombre" component={TextField} label="Ingrese su nombre" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="apellido" component={TextField} label="Ingrese su apellido" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth type="number" name="dni" component={TextField} label="Ingrese su dni" />
                        </Box>

                    </div>
                    <div title='Contacto'>
                        <Box paddingBottom={2}>
                            <Field type='email' fullWidth name="email" component={TextField} label="Ingrese su mail" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth type="number" name="telefono" component={TextField} label="Ingrese su telefono" />
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

    const handleChange = props => {
        setForm({ [props.name]: props.value })
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('El email ingresado es incorrecto').required('Requerido')
    })

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
                nombre: Yup.string().max(20, 'No se permiten más de 20 caracteres.').required('Por favor, ingrese su nombre'),
                apellido: Yup.string().max(20, 'No se permiten más de 20 caracteres.').required('Por favor, ingrese su apellido'),
                dni: Yup.number().lessThan(100000000, 'Su DNI debe ser menor a 100.000.000').moreThan(10000000, 'Su DNI debe ser mayor a 10.000.000').required('Por favor, ingrese su DNI')
                }) 
                : Yup.object({
                email: Yup.string().email('El email es incorrecto').required('Por favor, ingrese su email'),
                telefono: Yup.number().max(9999999999, 'El número ingresado no es válido.').min(1111111111, 'El número ingresado no es válido.').required('Por favor, ingrese su telefono')
                })
            }
            autoComplete='off'
        >
            { ({isSubmitting})  => (
                <Form autoComplete="off">
                    <Stepper activeStep={step} alternativeLabel>
                        {childrenArray.map((child, index) => (
                            <Step key={child.props.title} completed={step > index || completed}>
                                <StepLabel>{child.props.title}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {currentChild}
                            
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item>
                            {step > 0 ? <Button disabled={isSubmitting} style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#8C91FF', color: isSubmitting ? '#757575' : '#FFFFFF' }} onClick={() => setStep(step - 1)}>Atras</Button> : null}
                        </Grid>
                        <Grid item>
                            <Button 
                                disabled={isSubmitting} variant='contained'
                                startIcon={isSubmitting ? <CircularProgress size='1rem'/> : null} 
                                style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#8C91FF', color: isSubmitting ? '#757575' : '#FFFFFF' }} type='submit'>
                                    {isSubmitting ? 'Enviando' : isLastStep() ? 'Enviar' : 'Siguiente'}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}