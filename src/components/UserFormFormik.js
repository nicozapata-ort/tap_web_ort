import React, { useContext, useState } from 'react'
import { Card, CardContent, CircularProgress, Button, Box, Stepper, Step, StepLabel, Grid, Modal, Typography } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import FormContext from '../context/Form/FormContext.js'
import PromotionContext from '../context/Promotion/PromotionContext.js'
import axios from 'axios'
import * as Yup from 'yup';
import { useLocation } from "react-router-dom";
import { Scrollbar } from 'react-scrollbars-custom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';


export default function UserFormFormik() {
    const { promotion } = useContext(PromotionContext);
    const { dataForm, setRegisteredUser, setStep, setFormCompleted } = useContext(FormContext);
    const [coupon, setCoupon] = useState({});
    const [copyTextLink, setCopyTextLink] = useState({ copied: false });
    const [copyTextCoupon, setCopyTextCoupon] = useState({ copied: false });
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)

    const MessageCoupon = () => {
        return (
            <Modal
                open={openModal}
                onClose={handleClose}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Card id='card-message-coupon'>
                    <Scrollbar>
                        <CardContent>
                            <Grid container spacing={0} direction="column" style={{ ...styles.gridContainer, minHeight: '55vh' }}>

                                <Grid item container direction='row' style={{ ...styles.gridContainer, marginTop: '30px' }}>
                                    <Grid item container style={{ justifyContent: 'space-between' }}>
                                        <Grid item >
                                            <IconButton aria-label="Volver" sx={{ color: '#FFFFFF' }} onClick={handleClose}>
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item container direction='column' style={{...styles.gridContainer, textAlign: 'center', margin: '0 auto' }}>
                                    <Typography id='description-coupon' style={{ color: '#FFFFFF', fontSize: '22px', margin: '5px auto' }}>{promotion.longDescriptionCouponPrize}</Typography>
                                    <Typography id='description-coupon-2' style={{ color: '#FFFFFF', fontSize: '20px', margin: '5px auto' }}>{promotion.shortDescriptionCouponPrize}</Typography>
                                    
                                    <Grid item style={styles.borderCoupon}>
                                        <Typography id='coupon' style={{ color: '#FFFFFF', fontSize: '20px' }}>{`${coupon.cupon}`}</Typography>
                                    </Grid>
                                   
                                    <Typography id='description-link-referr' style={{ color: '#FFFFFF', fontSize: '18px', margin: '20px 0px' }}>{promotion.descriptionSharePrizeCoupon}</Typography>
                                   
                                    <Grid item style={styles.borderCoupon}>
                                        <Typography id='link-referr' style={{ color: '#FFFFFF', fontSize: '18px' }}>
                                            <a href={coupon.url_referidos} target='_blank' style={{ color: '#FFFFFF' }}>{`${coupon.url_referidos}`}</a>
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid item container direction='row' style={{ ...styles.gridContainer, textAlign: 'center', width: '50%', marginTop: '30px' }}>
                                    <Grid item style={{ ...styles.gridContainer, textAlign: 'center', margin: '15px auto' }}>
                                        <CopyToClipboard
                                            text={`${coupon.cupon}`}
                                            onCopy={() => setCopyTextCoupon({ ...copyTextCoupon, copied: true })}
                                        >
                                            <Button
                                                id='button-coupon-1'
                                                variant='contained'
                                                style={styles.buttonCoupon}
                                            >Copiar coupon</Button>
                                        </CopyToClipboard>
                                        {copyTextCoupon.copied ? <Typography id='copy-coupon' style={styles.copiedText}>Copiado.</Typography> : null}
                                    </Grid>

                                    <Grid item style={{ ...styles.gridContainer, textAlign: 'center', margin: '15px auto' }}>
                                        <CopyToClipboard
                                            text={`${coupon.url_referidos}`}
                                            onCopy={() => setCopyTextLink({ ...copyTextLink, copied: true })}
                                        >
                                            <Button
                                                id='button-coupon-2'
                                                variant='contained'
                                                style={styles.buttonCoupon}
                                            >Copiar link</Button>
                                        </CopyToClipboard>
                                        {copyTextLink.copied ? <Typography id='copy-link' style={styles.copiedText}>Copiado.</Typography> : null}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Scrollbar>
                </Card>
            </Modal>
        )
    }

    function useQuery() {
        return new URLSearchParams(useLocation().search)
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
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM1MzEzNjU3LCJleHAiOjE2Mzc5MDU2NTd9.CCz0ujJGDciWsAs3uBZ8Qr8lOM_hSXUd4jOI50YNJi8',
            },
        }

        try {
            const { data } = await axios.post(`http://localhost:1337/participants?referr=${query.get("referr")}`, user, auth)
            console.log(data)

            if (data.status !== 201) {
                console.log('Entre al if del error !201', data)
                throw new Error(data.type)
            }

            if (data != null) {
                setCoupon({ ...data })
                handleOpen()
                setRegisteredUser(true)
            }
        } catch (error) {
            alert('Error fatal!!!!', error.message)
        }
    }

    return (
        <Grid item style={{ ...styles.gridContainer, height: '80vh', width: '100%' }}>
            <Card id='card-container-form'>
                <Scrollbar style={{ width: '100%', height: '100%' }}>
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
                                    <Field fullWidth name="nombre" component={TextField} label="Ingresá tu nombre" variant="outlined" InputLabelProps={{ id: 'label-name-form', style: styles.textField}}/>
                                </Box>
                                <Box paddingBottom={1.5}>
                                    <Field fullWidth name="apellido" component={TextField} label="Ingresá tu apellido" variant="outlined" InputLabelProps={{ id: 'label-last-name-form', style: styles.textField}} />
                                </Box>
                                <Box paddingBottom={1.5}>
                                    <Field fullWidth type="number" name="dni" component={TextField} label="Ingresá tu dni" variant="outlined" InputLabelProps={{ id: 'label-dni-form', style: styles.textField}}/>
                                </Box>

                            </div>
                            <div title='Contacto'>
                                <Box paddingBottom={2}>
                                    <Field type='email' fullWidth name="email" component={TextField} label="Ingresá tu email" variant="outlined" InputLabelProps={{ id: 'label-email-form', style: styles.textField}}/>
                                </Box>
                                <Box paddingBottom={2}>
                                    <Field fullWidth type="number" name="telefono" component={TextField} label="Ingresá tu telefono" variant="outlined" InputLabelProps={{ id: 'label-phone-form', style: styles.textField}}/>
                                </Box>

                            </div>
                        </FormikStepper>
                    </CardContent>
                </Scrollbar>
            </Card>

            {openModal
                ? <MessageCoupon />
                : null}
        </Grid>
    )
}


export function FormikStepper({ children, ...props }) {
    const childrenArray = React.Children.toArray(children)
    const { step, setStep, formCompleted } = useContext(FormContext);
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
                    nombre: Yup.string().max(20, 'No se permiten más de 20 caracteres.').matches(/^[aA-zZ\s]+$/, "No se permiten valores alfanuméricos ni símbolos.").required('No es posible dejar el campo vacío.'),
                    apellido: Yup.string().max(20, 'No se permiten más de 20 caracteres.').matches(/^[aA-zZ\s]+$/, "No se permiten valores alfanuméricos y tampoco símbolos.").required('No es posible dejar el campo vacío.'),
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
                            <Stepper activeStep={step} alternativeLabel>
                                {childrenArray.map((child, index) => (
                                    <Step key={child.props.title} completed={step > index || formCompleted}>
                                        <StepLabel>
                                            <Typography id='step-label'>{child.props.title}</Typography>
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Grid>

                        <Grid item>
                            {currentChild}
                        </Grid>

                        <Grid item container spacing={2} alignContent="center" justifyContent="center" >
                            <Grid item>
                                {step > 0
                                    ? <Button
                                        id='button-form-1'
                                        disabled={isSubmitting}
                                        variant='contained'
                                        style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#4E53DB', color: isSubmitting ? '#757575' : '#FFFFFF' }}
                                        onClick={() => setStep(step - 1)}>Volver</Button>
                                    : null}
                            </Grid>
                            <Grid item>
                                <Button
                                    id='button-form-2'
                                    disabled={isSubmitting} variant='contained'
                                    startIcon={isSubmitting ? <CircularProgress size='1rem' /> : null}
                                    style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#4E53DB', color: isSubmitting ? '#757575' : '#FFFFFF' }} type='submit'>
                                    {'Siguiente'}
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