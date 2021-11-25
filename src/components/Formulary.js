import React, { useContext } from 'react'
import { texts } from '../assets/texts/strings.js'
import { Card, CardContent, CircularProgress, Button, Box, Stepper, Step, StepLabel, Grid, Typography } from '@material-ui/core'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import { TextField } from 'formik-material-ui'
import FormContext from '../context/Form/FormContext.js'
import * as Yup from 'yup';
import swal from 'sweetalert';
import { useLocation } from "react-router-dom";
import { Scrollbar } from 'react-scrollbars-custom'
import { getCoupon } from '../strapi/data.js'


export default function Formulary() {
    const { dataForm, setRegisteredUser, setStep, setFormCompleted, setCoupon, setOpenCouponModal, setOpenTermsModal } = useContext(FormContext);
    const handleOpenCoupon = () => setOpenCouponModal(true)
    const handleOpenTerms = () => setOpenTermsModal(true)

    function useQuery() {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQuery();

    const request = async (values) => {
        const user = {
            name: values.name,
            lastname: values.lastName,
            dni: values.dni,
            email: values.email,
            phone: values.phone,
        }

        const req = { user }

        try {
            const data = await getCoupon({ referr: query.get("referr"), req })

            if (data != null) {
                setCoupon({ ...data })
                handleOpenCoupon()
                setFormCompleted(true)
                setRegisteredUser(true)
            }
        } catch (error) {
            swal({
                title: "¡Error!",
                text: `${error.message}`,
                icon: 'error',
                button: {
                    text: "Aceptar",
                },
                timer: 10000
            });
        }
    }

    return (
        <Grid item style={{ ...styles.gridContainer, height: '80vh', width: '100%' }}>
            <Card id='form-card-container'>
                <Scrollbar style={{ width: '100%', height: '100%', zIndex: 300 }}>
                    <CardContent>
                        <FormikStepper
                            initialValues={{ ...dataForm }}
                            onSubmit={async (values, helpers) => {
                                await request(values);
                                helpers.resetForm()
                                setStep(0)
                                setFormCompleted(false)
                                setRegisteredUser(false)
                            }}
                        >
                            <div title='Datos personales'>
                                <Box paddingBottom={1.5}>
                                    <Field fullWidth name="name" component={TextField} label={texts.FORM_LABEL_NAME} variant="outlined" InputLabelProps={{ id: 'form-label-name', style: styles.textField }} />
                                </Box>
                                <Box paddingBottom={1.5}>
                                    <Field fullWidth name="lastName" component={TextField} label={texts.FORM_LABEL_LASTNAME} variant="outlined" InputLabelProps={{ id: 'form-label-last-name', style: styles.textField }} />
                                </Box>
                                <Box paddingBottom={1.5}>
                                    <Field fullWidth type="number" name="dni" component={TextField} label={texts.FORM_LABEL_DNI} variant="outlined" InputLabelProps={{ id: 'form-label-dni', style: styles.textField }} />
                                </Box>

                            </div>
                            <div title='Contacto'>
                                <Box paddingBottom={2}>
                                    <Field type='email' fullWidth name="email" component={TextField} label={texts.FORM_LABEL_EMAIL} variant="outlined" InputLabelProps={{ id: 'form-label-email', style: styles.textField }} />
                                </Box>
                                <Box paddingBottom={2}>
                                    <Field fullWidth type="number" name="phone" component={TextField} label={texts.FORM_LABEL_PHONE} variant="outlined" InputLabelProps={{ id: 'form-label-phone', style: styles.textField }} />
                                </Box>
                                <Box paddingBottom={2} style={{textAlign:'center'}}>
                                    <label id='form-label-terms' style={{ ...styles.textField }}>
                                        <Field
                                            type="checkbox"
                                            name="acceptTerms"
                                        />
                                        <> {texts.FORM_LABEL_TERMS} <Button id='form-button-3' variant="contained" onClick={handleOpenTerms} style={{ color: '#002350', backgroundColor:'#F3F3F3' }}>términos y condiciones.</Button> </>
                                    </label>
                                    <ErrorMessage name="acceptTerms" component="div" style={{ color: 'red', fontSize: '13px', paddingLeft: '15px' }} />
                                </Box>
                            </div>
                        </FormikStepper>
                    </CardContent>
                </Scrollbar>
            </Card>
        </Grid>
    )
}


export function FormikStepper({ children, ...props }) {
    const { step, setStep, formCompleted } = useContext(FormContext);
    const childrenArray = React.Children.toArray(children)
    const currentChild = childrenArray[step]

    const isLastStep = () => {
        return step === childrenArray.length - 1;
    }

    return (
        <Formik
            {...props}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers)
                } else {
                    setStep(step + 1)
                    helpers.setTouched({});
                }
            }}
            validationSchema={!isLastStep()
                ? Yup.object({
                    name: Yup.string().max(20, `${texts.ONLY_ALPHABET_TEXT_VAL_NAME}`).min(2, `${texts.ONLY_ALPHABET_TEXT_VAL_NAME}`).matches(/^[a-z_]+( [a-z_]+)*$/gim, `${texts.ONLY_ALPHABET_TEXT_VAL_NAME}`).required(`${texts.REQUIRED_TEXT_VAL}`),
                    lastName: Yup.string().max(20, `${texts.ONLY_ALPHABET_TEXT_VAL_LASTNAME}`).min(2, `${texts.ONLY_ALPHABET_TEXT_VAL_LASTNAME}`).matches(/^[a-z][']?[a-z]{0,20}( [a-z]+)*$/gim, `${texts.ONLY_ALPHABET_TEXT_VAL_LASTNAME}`).required(`${texts.REQUIRED_TEXT_VAL}`),
                    dni: Yup.number().integer("No puede ingresar valores con puntos o comas.").positive("No puede ingresar valores negativos.").lessThan(100000000, `${texts.MIN_NUMBER_DNI_VAL}`).moreThan(10000000, `${texts.MAX_NUMBER_DNI_VAL}`).required(`${texts.REQUIRED_TEXT_VAL}`)
                })
                : Yup.object({
                    email: Yup.string().matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, `${texts.EMAIL_VAL}`).required(`${texts.REQUIRED_TEXT_VAL}`),
                    phone: Yup.number().integer("No puede ingresar valores con puntos o comas.").positive("No puede ingresar valores negativos.").lessThan(9999999999, `${texts.PHONE_VAL}`).moreThan(1100000000, `${texts.PHONE_VAL}`).required(`${texts.REQUIRED_TEXT_VAL}`),
                    acceptTerms: Yup.boolean().oneOf([true], "No es posible dejar el campo sin completar.").required(`${texts.REQUIRED_TEXT_VAL}`)
                })
            }
        >
            {({ isSubmitting }) => (
                <Form autoComplete="off">
                    <Grid container direction='column' justifyContent='center' alignContent='center'>
                        <Grid item container alignContent="center" justifyContent="center" >
                            <Grid item style={{ width: '100vw' }}>
                                <Stepper activeStep={step} alternativeLabel>
                                    {childrenArray.map((child, index) => (
                                        <Step key={child.props.title} completed={step > index || formCompleted}>
                                            <StepLabel>
                                                <Typography id='label-step'>{child.props.title}</Typography>
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Grid>
                        </Grid>
                        <Grid item>
                            {currentChild}
                        </Grid>
                        <Grid item container spacing={2} alignContent="center" justifyContent="center" >
                            <Grid item>
                                {step > 0
                                    ?
                                    <Button
                                        id='form-button-1'
                                        disabled={isSubmitting}
                                        variant='contained'
                                        style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#4E53DB', color: isSubmitting ? '#757575' : '#FFFFFF' }}
                                        onClick={() => setStep(step - 1)}>
                                        {texts.BACK_BUTTON}
                                    </Button>
                                    : null}
                            </Grid>
                            <Grid item>
                                <Button
                                    id='form-button-2'
                                    disabled={isSubmitting} variant='contained'
                                    startIcon={isSubmitting ? <CircularProgress size='1rem' /> : null}
                                    style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#4E53DB', color: isSubmitting ? '#757575' : '#FFFFFF' }} type='submit'>
                                    {texts.NEXT_BUTTON}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}


const styles = {
    gridContainer: {
        justifyItems: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    borderCoupon: {
        borderRadius: '50px',
        borderColor: '#14D2B9',
        borderWidth: '3px',
        borderStyle: 'solid',
        margin: '10px auto',
        padding: '10px'
    },
    buttonCoupon: {
        backgroundColor: '#14D2B9',
        color: '#FFFFFF'
    },
    copiedText: {
        color: '#FFFFFF',
        fontSize: '13px',
        margin: '5px auto'
    },
    textField: {
        fontSize: '14px'
    }
}