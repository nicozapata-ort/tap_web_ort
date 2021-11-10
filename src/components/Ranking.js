import React, { useState, useEffect, useContext } from 'react'
import { texts } from '../assets/texts/strings.js'
import { Button, Modal, Box, Card, CardContent, Grid, Typography, List, ListItem, CircularProgress } from '@material-ui/core'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { Scrollbar } from 'react-scrollbars-custom'
import FormContext from '../context/Form/FormContext.js'
import PromotionContext from '../context/Promotion/PromotionContext.js'
import { getAllParticipants } from '../strapi/data.js'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup';
import axios from 'axios'
import swal from 'sweetalert';
import { getApiURL, getAuth, getPromotionId } from "../strapi/config.js";


const Ranking = () => {
    const { promotion } = useContext(PromotionContext);
    const { registeredUser } = useContext(FormContext);
    const [participants, setParticipants] = useState(null);
    const [userPositionRanking, setUserPositionRanking] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setIsCompleted(false) //Para que cuando salga del modal no siga manteniendo la posición del email ingresado
    };


    useEffect(async () => {
        const data = await getAllParticipants({ promotionId: getPromotionId() })
        setParticipants(data.data)
    }, [registeredUser]);

    function renderPartipantDetail() {
        return (
            <Scrollbar style={{ height: '300px' }}>
                <List>
                    {
                        participants.length > 0
                            ?
                            participants.map(function (participante, pos) {
                                return (
                                    <ListItem className='ranking-list-item' key={pos}>

                                        <Grid item xs={2} sm={2} md={2}>
                                            <div className='pos-item-circle'>
                                                <Typography id='pos-part-ranking' style={{ color: '#405A7C' }}>{pos + 1}</Typography>
                                            </div>
                                        </Grid>

                                        <Grid item xs={7} sm={8} md={8} style={{ textAlign: 'center' }}>
                                            <Typography id='name-part-ranking' style={{ color: '#FFFFFF' }}>{`${participante.name} ${participante.lastname[0]}.`}</Typography>
                                        </Grid>

                                        <Grid item xs={3} sm={2} md={2} style={{ textAlign: 'center' }}>
                                            <Typography id='points-part-ranking' style={{ color: '#6EF1C7' }}>{`${participante.referrals} puntos`}</Typography>
                                        </Grid>
                                    </ListItem>
                                )
                            })

                            : null
                    }
                </List>
            </Scrollbar>
        )
    }

    const ChildModal = () => {
        const [openModal, setOpenModal] = useState(false);
        const handleOpen = () => setOpenModal(true)
        const handleClose = () => setOpenModal(false)

        return (
            <>

                <Button id='ranking-button-2' variant='contained' onClick={handleOpen}>{`${texts.PRIZES_BUTTON}`}</Button>

                <Modal
                    open={openModal}
                    onClose={handleClose}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Card id='ranking-card-2' className='unselectable'>
                        <Scrollbar>
                            <CardContent>
                                <Grid container spacing={3} style={styles.gridContainer}>

                                    <Grid item container direction='row' style={{ ...styles.gridContainer, marginTop: '30px', justifyContent: 'center' }}>
                                        <Grid item container style={{ justifyContent: 'space-between' }}>
                                            <Grid item >
                                                <IconButton aria-label="Volver" sx={{ color: '#FFFFFF' }} onClick={handleClose}>
                                                    <ArrowBackIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                        <div style={{ position: 'absolute', margin: '0 auto' }}>
                                            <Typography id='prizes-title' style={styles.textTitle}>{`${texts.TITLE_OF_PRIZES}`}</Typography>
                                        </div>
                                    </Grid>

                                    <Grid item container style={styles.gridContainer}>
                                        <Card style={{ backgroundColor: '#002350', borderColor: '#14D2B9', borderStyle: 'solid', borderWidth: '5px' }}>
                                            <CardContent>
                                                <Grid item style={{ textAlign: 'center', padding: '10px' }}>
                                                    <Typography id='part-prize-price-1' style={styles.textDescription}>{`${promotion.descriptionFirstPrize} $${promotion.prizeMaxPrice}`}</Typography>
                                                    <Typography id='part-prize-price-2' style={styles.textDescription}>{`${promotion.descriptionSecondPrize} $${promotion.prizeMinPrice}`}</Typography>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    <Grid item container direction="column" style={{ justifyContent: 'center', alignContent: 'center' }}>
                                        {participants
                                            ? renderPartipantDetail()
                                            : null}
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Scrollbar>
                    </Card>
                </Modal>
            </>
        );
    }

    const request = async (email) => {

        try {
            const { data, positionUserEmail } = await getAllParticipants({ email, promotionId: getPromotionId() })

            console.log(data)
            setParticipants(data)
            setIsCompleted(true)
            return positionUserEmail


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
        <>
            <div className='ranking-button-container'>
                <Button id='ranking-button' variant='contained' onClick={handleOpen}>{`${texts.RANKING_BUTTON}`}</Button>
            </div>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Card id='ranking-card' className='unselectable'>
                    <Scrollbar>
                        <CardContent>
                            <div className='ranking-modal'>
                                <Grid container spacing={4} direction='column' style={styles.gridContainer}>

                                    <Grid item container direction='row' style={{ ...styles.gridContainer, marginTop: '30px' }}>
                                        <Grid item container style={{ justifyContent: 'space-between' }}>
                                            <Grid item >
                                                <IconButton aria-label="Volver" sx={{ color: '#FFFFFF' }} onClick={handleClose}>
                                                    <ArrowBackIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                        <div style={{ position: 'absolute', margin: '0 auto' }}>
                                            <Typography id='ranking-title' style={styles.textTitle}>{`${texts.TITLE_OF_RANKING}`}</Typography>
                                        </div>
                                    </Grid>

                                    <Grid item style={{ ...styles.gridContainer, textAlign: 'center' }}>
                                        <Typography id='ranking-subtitle' style={styles.textSubTitle}>{`${texts.SUBTITLE_OF_RANKING}`}</Typography>
                                    </Grid>

                                    <Grid item container style={{ ...styles.gridContainer }}>
                                        <Card id='ranking-form-card'>
                                            <CardContent>
                                                <Formik
                                                    initialValues={{ email: '' }}
                                                    onSubmit={async (values, helpers) => {
                                                        const userRanking = await request(values.email)
                                                        if (userRanking) {
                                                            setUserPositionRanking(userRanking)
                                                        }
                                                        // helpers.resetForm()
                                                    }}
                                                    validationSchema={Yup.object({
                                                        email: Yup.string().email(`${texts.EMAIL_VAL}`).required(`${texts.REQUIRED_TEXT_VAL}`)
                                                    })
                                                    }
                                                >
                                                    {({ isSubmitting }) => (
                                                        <Form autoComplete="off">
                                                            <Box paddingBottom={2}>
                                                                <Field type='email' fullWidth name="email" component={TextField} label={texts.FORM_LABEL_EMAIL} variant="outlined" InputLabelProps={{ id: 'form-label-email', style: styles.textField }} />
                                                            </Box>
                                                            <Grid container spacing={2} style={styles.gridContainer}>
                                                                <Grid item>
                                                                    <Button
                                                                        disabled={isSubmitting} variant='contained'
                                                                        id='ranking-button-form'
                                                                        startIcon={isSubmitting ? <CircularProgress size='1rem' /> : null}
                                                                        style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#14D2B9', color: isSubmitting ? '#757575' : '#FFFFFF' }} type='submit'>
                                                                        {`${texts.SEE_POSITION_BUTTON}`}
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </CardContent>
                                        </Card>

                                        {isCompleted

                                            ? userPositionRanking > 0

                                                ? <Grid item style={{ ...styles.gridContainer, marginTop: '50px', textAlign: 'center' }}>
                                                    <Typography id='desc-part-pos' style={{ ...styles.textSubTitle }}>{`${texts.DESCRIPTION_OF_THE_RANKING_POSITION}`}</Typography>
                                                    <Typography id='pos-part' style={{ ...styles.textSubTitle, ...styles.textBorder }}>{userPositionRanking}</Typography>
                                                    <Typography id='desc-part-prize' style={styles.textSubTitle}>{`${texts.DESCRIPTION_OF_THE_PRIZE_IN_RANKING}`}</Typography>
                                                    <Typography id='part-prize-price-3' style={{ ...styles.textSubTitle, ...styles.textBorder }}>${userPositionRanking <= promotion.firstPlaces ? promotion.prizeMaxPrice : promotion.prizeMinPrice} </Typography>
                                                </Grid>
                                                : <Grid item style={{ ...styles.gridContainer, marginTop: '30px', textAlign: 'center' }}>
                                                    <Typography id='email-not-found' style={{ ...styles.textSubTitle, marginBottom: '10px', fontSize: '18px' }}>{`${texts.EMAIL_NOT_FOUND}`}</Typography>
                                                    <Typography id='desc-part-without-pos' style={styles.textSubTitle}>{`${texts.INVITATION_TO_PARTICIPATE}`}</Typography>
                                                </Grid>
                                            : null
                                        }
                                    </Grid>

                                    <ChildModal />
                                </Grid>

                            </div>
                        </CardContent>
                    </Scrollbar>
                </Card>
            </Modal>
        </>
    )
}

export default Ranking


const styles = {
    gridContainer: {
        justifyItems: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    textTitle: {
        color: '#FFFFFF',
        fontSize: '25px'
    },
    textSubTitle: {
        color: '#FFFFFF',
        fontSize: '20px',
    },
    textDescription: {
        color: '#FFFFFF'
    },
    textField: {
        fontSize: 14
    },
    textBorder: {
        borderRadius: '50px',
        borderColor: '#14D2B9',
        borderWidth: '3px',
        borderStyle: 'solid',
        width: '50%',
        margin: '10px auto'
    }
}