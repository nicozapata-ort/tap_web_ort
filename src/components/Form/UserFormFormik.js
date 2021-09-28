import React, { useContext } from 'react'
import { Card, CardContent, Typography, Button, Box, Stepper, Step, StepLabel, Grid } from '@material-ui/core'

import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'
import FormContext from '../../context/Form/FormContext'


export default function UserFormFormik() {

    const { dataForm, setForm } = useContext(FormContext);

    return (
        <Card>
            <CardContent>
                <FormikStepper
                    initialValues={{ ...dataForm }}
                    onSubmit={() => { }}
                >
                    <div title='Personal Data'>
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
                    <div title='Contact'>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="mail" component={TextField} label="Ingrese su mail" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="telefono" component={TextField} label="Ingrese su telefono" />
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

    const isLastStep = () => {
        return step === childrenArray.length - 1;
    }

    const handleChange = props => {
        setForm({ [props.name]: props.value })
    }

    return (
        <Formik {...props} onSubmit={async (values, helpers) => {
            if (isLastStep()) {
                await props.onSubmit(values, helpers)
            } else {
                setStep(step + 1)
            }
        }}>
            <Form autoComplete="off">
                <Stepper activeStep={step} alternativeLabel>
                    {childrenArray.map((child) => (
                        <Step key={child.props.title}>
                            <StepLabel>{child.props.title}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {currentChild}

                <Grid container spacing={2} alignItems="center" justify="center">
                    <Grid item>
                        {step > 0 ? <Button style={{ backgroundColor: '#8C91FF', color: '#FFFFFF' }} onClick={() => setStep(step - 1)}>Back</Button> : null}
                    </Grid>
                    <Grid item>
                        <Button variant='contained' style={{ backgroundColor: '#8C91FF', color: '#FFFFFF' }} type='submit'>{isLastStep() ? 'Submit' : 'Next'}</Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    )
}