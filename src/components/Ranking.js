import React, { useState, useEffect, useContext } from 'react'
import { Button, Modal, Box, Card, CardContent, Grid, Typography, List, ListItem, CircularProgress } from '@material-ui/core'
import { getAllParticipants2 } from '../strapi/data.js'
import { Scrollbar } from 'react-scrollbars-custom'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup';
import axios from 'axios'
import PromotionContext from '../context/Promotion/PromotionContext.js'
import FormContext from '../context/Form/FormContext.js'


const Ranking = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [participantes, setParticipantes] = useState([]);
    const [userPositionRanking, setUserPositionRanking] = useState(0);
    const { promotion } = useContext(PromotionContext);
    const { registeredUser } = useContext(FormContext);


    useEffect(async () => {
        const data = await getAllParticipants2()
        setParticipantes(data)
        console.log('Estoy en Ranking, hubo un cambio en registeredUser', registeredUser)
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
                                                <Typography style={{ fontFamily: 'Comfortaa', color: '#405A7C' }}>{pos + 1}</Typography>
                                            </div>
                                        </Grid>

                                        <Grid item xs={7} sm={8} md={8} style={{ textAlign: 'center' }}>
                                            <Typography style={{ fontFamily: 'Comfortaa' }}>{`${participante.Nombre} ${participante.Apellido[0]}.`}</Typography>
                                        </Grid>

                                        <Grid item xs={3} sm={2} md={2} style={{ textAlign: 'center' }}>
                                            <Typography style={{ fontFamily: 'Comfortaa', color: '#6EF1C7' }}>{`${participante.Referidos} puntos`}</Typography>
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

    // const sleep = (time) => new Promise((acc) => setTimeout(acc, time))

    const ChildModal = () => {
        const [openModal, setOpenModal] = useState(false);
        const handleOpen = () => setOpenModal(true)
        const handleClose = () => setOpenModal(false)

        return (
            <>
                <Button id='button-ranking-2' variant='contained' onClick={handleOpen}>Ver Ranking Completo</Button>
                <Modal 
                    open={openModal} 
                    onClose={handleClose}
                    style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                >
                    <Card id='card-ranking' className='unselectable'>
                        <Scrollbar>
                            <CardContent>
                                <Grid container spacing={3} style={styles.gridContainer}>
                                    {/* <Grid item container style={styles.gridContainer}>
                                        <Typography style={styles.textTitle}>Ranking</Typography>
                                    </Grid> */}

                                    <Grid item container style={styles.gridContainer}>
                                        <Card style={{ backgroundColor: '#002350', marginTop:'10px', borderColor:'#14D2B9', borderStyle:'solid', borderWidth:'5px' }}>
                                            <CardContent>
                                                <Grid item style={{ textAlign: 'center' }}>
                                                    <Typography style={styles.textSubTitle}>Premio</Typography>
                                                    <Typography style={styles.textDescription}>Entre posicion 1-10: $5000</Typography>
                                                    <Typography style={styles.textDescription}>{}Mayor a posicion  10: $1000</Typography>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    <Grid item container direction="column" style={{ justifyContent: 'center', alignContent:'center' }}>
                                        {renderPartipantDetail()}
                                    </Grid>

                                    <Button id='button-ranking-3' variant='contained' onClick={handleClose}>Atrás</Button>
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
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNDkyNzU4LCJleHAiOjE2MzYwODQ3NTh9.tTONIIv436EnoUz2Aa3Z55ToOp20dJz5u5lenPm5o8M'
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
                style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            >
                <Card id='card-ranking' className='unselectable'>
                    <Scrollbar>
                        <CardContent>
                            <div className='modal-ranking'>
                                <Grid container spacing={4} direction='column' style={styles.gridContainer}>

                                    <Grid item style={{...styles.gridContainer, marginTop:'30px'}}>
                                        <Typography style={styles.textTitle}>Ranking</Typography>
                                    </Grid>

                                    <Grid item style={{ ...styles.gridContainer, textAlign: 'center' }}>
                                        <Typography style={styles.textSubTitle}>¡Ingresa tu correo electrónico para saber tu posición!</Typography>
                                    </Grid>

                                    <Grid item container style={{ ...styles.gridContainer }}>
                                        <Card style={{ width: '100%', height: '150px', paddingTop: '20px', backgroundColor: '#FFFFFF', marginTop:'10px', borderColor:'#14D2B9', borderStyle:'solid', borderWidth:'3px' }}>
                                            <CardContent>
                                                <Formik
                                                    initialValues={{ email: '' }}
                                                    onSubmit={async (values, helpers) => {
                                                        const userRanking = await request(values.email)
                                                        console.log('values', values)
                                                        console.log('posicion userRanking', userRanking.positionUserEmail)
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
                                                                <Field type='email' fullWidth name="email" component={TextField} label="Ingrese su mail" variant="outlined" InputLabelProps={{ style: styles.textField }} />
                                                            </Box>
                                                            <Grid container spacing={2} style={styles.gridContainer}>
                                                                <Grid item>
                                                                    <Button
                                                                        disabled={isSubmitting} variant='contained'
                                                                        startIcon={isSubmitting ? <CircularProgress size='1rem' /> : null}
                                                                        style={{ backgroundColor: isSubmitting ? '#CDCDCD' : '#14D2B9', color: isSubmitting ? '#757575' : '#FFFFFF', borderRadius: '25px', textTransform: 'none', fontFamily: 'Comfortaa' }} type='submit'>
                                                                        {isSubmitting ? 'Enviando' : 'Enviar'}
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </CardContent>
                                        </Card>

                                        {isCompleted
                                            ? <Grid item direction='column' style={{ ...styles.gridContainer, marginTop: '50px', textAlign: 'center' }}>
                                                <Typography style={{ ...styles.textSubTitle}}>Estás en la posición</Typography>
                                                <Typography style={{ ...styles.textSubTitle, borderRadius:'50px', borderColor:'#14D2B9', borderWidth:'3px', borderStyle:'solid',width:'50%', margin:'10px auto'}}>{userPositionRanking}</Typography>
                                                <Typography style={styles.textSubTitle}>Tu premio es de</Typography>
                                                <Typography style={{...styles.textSubTitle, borderRadius:'50px', borderColor:'#14D2B9', borderWidth:'3px', borderStyle:'solid',width:'50%', margin:'10px auto'}}>${userPositionRanking <= 10 ? promotion.prizeMaxPrice : promotion.prizeMinPrice} </Typography>
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
        fontFamily: 'Comfortaa Semibold', //Debe ser BOLD
        color: '#FFFFFF',
        fontSize: '25px'
    },
    textSubTitle: {
        fontFamily: 'Comfortaa Semibold',
        color: '#FFFFFF',
        fontSize: '20px',
        marginBottom: '10px'
    },
    textDescription: {
        fontFamily: 'Comfortaa Medium',
        color: '#FFFFFF'
    },
    textField: {
        fontFamily: 'Comfortaa',
        fontSize: 14
    },
}