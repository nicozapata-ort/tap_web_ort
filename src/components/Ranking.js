import React, { useState, useEffect, useContext } from 'react'
import { Button, Modal, Box, Card, CardContent, Grid, Typography, List, ListItem, CircularProgress } from '@material-ui/core'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { Scrollbar } from 'react-scrollbars-custom'
import FormContext from '../context/Form/FormContext.js'
import PromotionContext from '../context/Promotion/PromotionContext.js'
import { getAllParticipants2 } from '../strapi/data.js'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup';
import axios from 'axios'

const Ranking = () => {
    const { promotion } = useContext(PromotionContext);
    const { registeredUser } = useContext(FormContext);
    const [participantes, setParticipantes] = useState(null);
    const [userPositionRanking, setUserPositionRanking] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(async () => {
        const data = await getAllParticipants2()
        setParticipantes(data)
    }, [registeredUser]);

    function renderPartipantDetail() {
        return (
            <Scrollbar style={{ height: '300px' }}>
                <List>
                    {
                        participantes.length > 0
                            ?
                            participantes.map(function (participante, pos) {
                                return (
                                    <ListItem className='list-item-ranking' key={pos}>

                                        <Grid item xs={2} sm={2} md={2}>
                                            <div className='circle-pos-item'>
                                                <Typography id='participantsRankingPosition' style={{ color: '#405A7C' }}>{pos + 1}</Typography>
                                            </div>
                                        </Grid>

                                        <Grid item xs={7} sm={8} md={8} style={{ textAlign: 'center' }}>
                                            <Typography id='participantsRankingName' style={{ color: '#FFFFFF' }}>{`${participante.Nombre} ${participante.Apellido[0]}.`}</Typography>
                                        </Grid>

                                        <Grid item xs={3} sm={2} md={2} style={{ textAlign: 'center' }}>
                                            <Typography id='participantsRankingPoints' style={{ color: '#6EF1C7' }}>{`${participante.Referidos} puntos`}</Typography>
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
                <Button id='button-ranking-2' variant='contained' onClick={handleOpen}>Ver premios</Button>
                <Modal
                    open={openModal}
                    onClose={handleClose}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Card id='card-ranking' className='unselectable'>
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
                                            <Typography id='titleRanking' style={styles.textTitle}>Premios</Typography>
                                        </div>
                                    </Grid>

                                    <Grid item container style={styles.gridContainer}>
                                        <Card style={{ backgroundColor: '#002350', borderColor: '#14D2B9', borderStyle: 'solid', borderWidth: '5px' }}>
                                            <CardContent>
                                                <Grid item style={{ textAlign: 'center', padding: '10px' }}>
                                                    <Typography id='participantRankingPrizePrice1' style={styles.textDescription}>Entre posición 1-10: $5000</Typography>
                                                    <Typography id='participantRankingPrizePrice2' style={styles.textDescription}>{ }Mayor a posición  10: $1000</Typography>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    <Grid item container direction="column" style={{ justifyContent: 'center', alignContent: 'center' }}>
                                        {participantes 
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
            const { data } = await axios.get('http://localhost:1337/ranking', {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM1MzEzNjU3LCJleHAiOjE2Mzc5MDU2NTd9.CCz0ujJGDciWsAs3uBZ8Qr8lOM_hSXUd4jOI50YNJi8'
                },
                params: { email: email }
            });

            // if (data.status !== 201) {
            //     console.log('Entre al if del error !201', data.status )
            //     throw new Error(data.type)
            // }

            console.log('codigo de estado del get:', data)

            // if (data != null) {
            //     setCupon({...data})
            //     handleOpen()
            // }

            return data
        } catch (error) {
            alert('Error fatal, mail no encontrado!!!!', error.message)
        }
    }


    return (
        <>
            <div className='App-description-button'>
                <Button id='button-ranking' variant='contained' onClick={handleOpen}>Ver ranking</Button>
            </div>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Card id='card-ranking' className='unselectable'>
                    <Scrollbar>
                        <CardContent>
                            <div className='modal-ranking'>
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
                                            <Typography id='titleRanking' style={styles.textTitle}>Ranking</Typography>
                                        </div>
                                    </Grid>

                                    <Grid item style={{ ...styles.gridContainer, textAlign: 'center' }}>
                                        <Typography id='subtitleRanking' style={styles.textSubTitle}>¡Ingresá tu correo electrónico para saber tu posición!</Typography>
                                    </Grid>

                                    <Grid item container style={{ ...styles.gridContainer }}>
                                        <Card style={{ width: '100%', height: '150px', paddingTop: '20px', backgroundColor: '#FFFFFF', marginTop: '10px', borderColor: '#14D2B9', borderStyle: 'solid', borderWidth: '3px' }}>
                                            <CardContent>
                                                <Formik
                                                    initialValues={{ email: '' }}
                                                    onSubmit={async (values, helpers) => {
                                                        const userRanking = await request(values.email)
                                                        setIsCompleted(true)
                                                        setUserPositionRanking(userRanking.positionUserEmail)
                                                        // helpers.resetForm()
                                                    }}
                                                    validationSchema={Yup.object({
                                                        email: Yup.string().email('El email ingresado es incorrecto.').required('No es posible dejar el campo vacío.')
                                                    })
                                                    }
                                                >
                                                    {({ isSubmitting }) => (
                                                        <Form autoComplete="off">
                                                            <Box paddingBottom={2}>
                                                                <Field type='email' fullWidth name="email" component={TextField} label="Ingresá tu email" variant="outlined" InputLabelProps={{ id: 'label-email-form-ranking', style: styles.textField }} />
                                                            </Box>
                                                            <Grid container spacing={2} style={styles.gridContainer}>
                                                                <Grid item>
                                                                    <Button
                                                                        disabled={isSubmitting} variant='contained'
                                                                        id='button-ranking-form'
                                                                        startIcon={isSubmitting ? <CircularProgress size='1rem' /> : null}
                                                                        style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#14D2B9', color: isSubmitting ? '#757575' : '#FFFFFF' }} type='submit'>
                                                                        {'Ver mi posición'}
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
                                                    <Typography id='descriptionParticipantRankingPosition' style={{ ...styles.textSubTitle }}>Estás en la posición</Typography>
                                                    <Typography id='participantsRankingPosition' style={{ ...styles.textSubTitle, borderRadius: '50px', borderColor: '#14D2B9', borderWidth: '3px', borderStyle: 'solid', width: '50%', margin: '10px auto' }}>{userPositionRanking}</Typography>
                                                    <Typography id='descriptionParticipantRankingPrize' style={styles.textSubTitle}>Tu premio es de</Typography>
                                                    <Typography id='participantRankingPrizePrice3' style={{ ...styles.textSubTitle, borderRadius: '50px', borderColor: '#14D2B9', borderWidth: '3px', borderStyle: 'solid', width: '50%', margin: '10px auto' }}>${userPositionRanking <= 10 ? promotion.prizeMaxPrice : promotion.prizeMinPrice} </Typography>
                                                </Grid>
                                                : <Grid item style={{ ...styles.gridContainer, marginTop: '30px', textAlign: 'center' }}>
                                                    <Typography id='emailNotFound' style={{ ...styles.textSubTitle, marginBottom: '10px', fontSize: '18px' }}>Email no encontrado</Typography>
                                                    <Typography id='descriptionNoParticipantRankingPosition' style={styles.textSubTitle}>¡Te invitamos a completar el formulario para participar!</Typography>
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
}