import React, { useContext, useState } from 'react'
import { texts } from '../assets/texts/strings.js'
import { Card, CardContent, CircularProgress, Button, Box, Stepper, Step, StepLabel, Grid, Modal, Typography } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import FormContext from '../context/Form/FormContext.js'
import PromotionContext from '../context/Promotion/PromotionContext.js'
import axios from 'axios'
import * as Yup from 'yup';
import swal from 'sweetalert';
import { useLocation } from "react-router-dom";
import { Scrollbar } from 'react-scrollbars-custom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { getApiURL, getAuth, getPromotionId } from "../strapi/config.js";




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
                <Card id='message-coupon-card'>
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

                                <Grid item container direction='column' style={{ ...styles.gridContainer, textAlign: 'center', margin: '0 auto' }}>
                                    <Typography id='coupon-desc' style={{ color: '#FFFFFF', fontSize: '22px', margin: '5px auto' }}>{promotion.couponPrizeLongDescription}</Typography>
                                    <Typography id='coupon-desc-2' style={{ color: '#FFFFFF', fontSize: '20px', margin: '5px auto' }}>{promotion.couponPrizeShortDescription}</Typography>

                                    <Grid item style={styles.borderCoupon}>
                                        <Typography id='coupon' style={{ color: '#FFFFFF', fontSize: '20px' }}>{`${coupon.coupon}`}</Typography>
                                    </Grid>

                                    <Typography id='desc-referr-link' style={{ color: '#FFFFFF', fontSize: '18px', margin: '20px 0px' }}>{promotion.descriptionSharePrizeCoupon}</Typography>

                                    <Grid item style={styles.borderCoupon}>
                                        <Typography id='referr-link' style={{ color: '#FFFFFF', fontSize: '18px' }}>
                                            <a href={coupon.url_referrals} target='_blank' style={{ color: '#FFFFFF' }}>{`${coupon.url_referrals}`}</a>
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid item container direction='row' style={{ ...styles.gridContainer, textAlign: 'center', width: '50%', marginTop: '30px' }}>
                                    <Grid item style={{ ...styles.gridContainer, textAlign: 'center', margin: '15px auto' }}>
                                        <CopyToClipboard
                                            text={`${coupon.coupon}`}
                                            onCopy={() => setCopyTextCoupon({ ...copyTextCoupon, copied: true })}
                                        >
                                            <Button
                                                id='coupon-button-1'
                                                variant='contained'
                                                style={styles.buttonCoupon}
                                            >{texts.COUPON_MC_BUTTON}</Button>
                                        </CopyToClipboard>
                                        {copyTextCoupon.copied ? <Typography id='copy-coupon' style={styles.copiedText}>{texts.TEXT_COPIED}</Typography> : null}
                                    </Grid>

                                    <Grid item style={{ ...styles.gridContainer, textAlign: 'center', margin: '15px auto' }}>
                                        <CopyToClipboard
                                            text={`${coupon.url_referrals}`}
                                            onCopy={() => setCopyTextLink({ ...copyTextLink, copied: true })}
                                        >
                                            <Button
                                                id='coupon-button-2'
                                                variant='contained'
                                                style={styles.buttonCoupon}
                                            >{texts.LINK_MC_BUTTON}</Button>
                                        </CopyToClipboard>
                                        {copyTextLink.copied ? <Typography id='copy-link' style={styles.copiedText}>{texts.TEXT_COPIED}</Typography> : null}
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
            name: values.nombre,
            lastname: values.apellido,
            dni: values.dni,
            email: values.email,
            phone: values.telefono,
        }

        const promotionId = getPromotionId();

        const req = { user, promotionId }

        try {

            const { data } = await axios.post(`${getApiURL()}/participants?referr=${query.get("referr")}`, req, getAuth())

            if (data.status !== 201) {
                throw new Error(data.message)
            }

            if (data != null) {
                setCoupon({ ...data })
                handleOpen()
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
                                    <Field fullWidth name="nombre" component={TextField} label={texts.FORM_LABEL_NAME} variant="outlined" InputLabelProps={{ id: 'form-label-name', style: styles.textField }} />
                                </Box>
                                <Box paddingBottom={1.5}>
                                    <Field fullWidth name="apellido" component={TextField} label={texts.FORM_LABEL_LASTNAME} variant="outlined" InputLabelProps={{ id: 'form-label-last-name', style: styles.textField }} />
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
                                    <Field fullWidth type="number" name="telefono" component={TextField} label={texts.FORM_LABEL_PHONE} variant="outlined" InputLabelProps={{ id: 'form-label-phone', style: styles.textField }} />
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
                    nombre: Yup.string().max(20, `${texts.MAX_CHARACTER_TEXT_VAL}`).matches(/^[aA-zZ\s]+$/, `${texts.ONLY_ALPHABET_TEXT_VAL}`).required(`${texts.REQUIRED_TEXT_VAL}`),
                    apellido: Yup.string().max(20, `${texts.MAX_CHARACTER_TEXT_VAL}`).matches(/^[aA-zZ\s]+$/, `${texts.ONLY_ALPHABET_TEXT_VAL}`).required(`${texts.REQUIRED_TEXT_VAL}`),
                    dni: Yup.number().lessThan(100000000, `${texts.MIN_NUMBER_DNI_VAL}`).moreThan(10000000, `${texts.MAX_NUMBER_DNI_VAL}`).required(`${texts.REQUIRED_TEXT_VAL}`)
                })
                : Yup.object({
                    email: Yup.string().email(`${texts.EMAIL_VAL}`).required(`${texts.REQUIRED_TEXT_VAL}`),
                    telefono: Yup.number().lessThan(9999999999, `${texts.PHONE_VAL}`).moreThan(1100000000, `${texts.PHONE_VAL}`).required(`${texts.REQUIRED_TEXT_VAL}`)
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