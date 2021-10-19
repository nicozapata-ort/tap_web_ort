import React, { useState, useEffect } from 'react'
import { Button, Modal, Box, Card, CardContent, Grid, Typography, List, ListItem, CircularProgress, ListItemIcon, ListItemText } from '@material-ui/core'
import { getAllParticipants, getAllParticipants2 } from '../strapi/data.js'
import crown from '../crown2.png'
import { Scrollbar } from 'react-scrollbars-custom'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup';



const Ranking = () => {
    // const [openModal, setOpenModal] = useState(false);
    // const handleOpen = () => setOpenModal(true)
    // const handleClose = () => setOpenModal(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [participantes, setParticipantes] = useState([]);

    // const participantes = getAllParticipants()

    useEffect(async () => {
        const data = await getAllParticipants2()
        setParticipantes(data)
    }, []);

    function renderPodiumParticipants() {
        return (
            <> {participantes != null && participantes.length > 3
                ?
                <>
                    <Grid item container direction='column' justifyContent='center' alignContent='center' justifyItems='center' alignItems='center' xs={3} md={2} style={{ textAlign: 'center', margin: '70px 0px 10px 0px' }}>
                        <Grid id='segunda-posicion-ranking' item>
                            <Box id='container-description-seg-pos'>
                                <Typography style={{ fontFamily: 'Comfortaa', fontSize: '18px' }}>2do</Typography>
                                <Typography style={{ fontFamily: 'Comfortaa', fontSize: '12px', color: '#6EF1C7' }}>{participantes[1].Referidos}</Typography>
                            </Box>
                        </Grid>
                        <Typography style={{ fontFamily: 'Comfortaa' }}>{`${participantes[1].Nombre} ${participantes[1].Apellido[0]}.`}</Typography>
                    </Grid>

                    <Grid item direction='column' justifyContent='center' alignContent='center' justifyItems='center' alignItems='center' container direction='column' xs={6} md={3} style={{ textAlign: 'center', margin: '0px 0px 30px 0px' }}>
                        <img src={crown} alt='corona' height='50px' width='50px' />
                        <Grid id='primera-posicion-ranking' item>
                            <Box id='container-description-prim-pos'>
                                <Typography style={{ fontFamily: 'Comfortaa', fontSize: '25px' }}>1ro</Typography>
                                <Typography style={{ fontFamily: 'Comfortaa', fontSize: '14px', color: '#6EF1C7' }}>{participantes[0].Referidos}</Typography>
                            </Box>
                        </Grid>
                        <Typography style={{ fontFamily: 'Comfortaa' }}>{`${participantes[0].Nombre} ${participantes[0].Apellido[0]}.`}</Typography>
                    </Grid>

                    <Grid item direction='column' justifyContent='center' alignContent='center' justifyItems='center' alignItems='center' container xs={3} md={2} style={{ textAlign: 'center', margin: '70px 0px 10px 0px' }}>
                        <Grid id='tercera-posicion-ranking' item>

                            <Box id='container-description-ter-pos'>
                                <Typography style={{ fontFamily: 'Comfortaa', fontSize: '18px' }}>3ro</Typography>
                                <Typography style={{ fontFamily: 'Comfortaa', fontSize: '12px', color: '#6EF1C7' }}>{participantes[2].Referidos}</Typography>
                            </Box>
                        </Grid>
                        <Typography style={{ fontFamily: 'Comfortaa' }}>{`${participantes[2].Nombre} ${participantes[2].Apellido[0]}.`}</Typography>
                    </Grid>
                </>

                : null

            }

            </>
        )
    }

    function renderPartipantDetail() {
        return (
            <Scrollbar style={{ width: '100%', height: '300px' }}>
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

    const sleep = (time) => new Promise((acc) => setTimeout(acc, time))

    const ChildModal = () => {
        const [openModal, setOpenModal] = useState(false);
        const handleOpen = () => setOpenModal(true)
        const handleClose = () => setOpenModal(false)

        return (
            <>
                <Button id='button-ranking2' variant='contained' onClick={handleOpen}>Ver Ranking Completo</Button>
                <Modal open={openModal} onClose={handleClose}>
                    <Card id='card-ranking' className='unselectable'>
                        <Scrollbar style={{ width: '100%', height: '100%' }}>
                            <CardContent>
                                <Grid container spacing={3} justifyContent='center' alignContent='center' style={{ justifyItems:'center', alignItems:'center' }}>
                                    <Grid item container justifyContent='center' alignContent='center'>
                                        <Typography style={{ fontFamily: 'Comfortaa Semibold', color: '#FFFFFF', fontSize: '25px' }}>Ranking</Typography>
                                        {/* {renderPodiumParticipants()} */}
                                    </Grid>

                                    <Grid item container justifyContent='center' alignContent='center'>
                                        <Card style={{ backgroundColor: '#14D2B9', width: '100%' }}>
                                            <CardContent>
                                                <Grid item style={{ textAlign: 'center' }}>
                                                    <Typography style={{ fontFamily: 'Comfortaa Semibold', color: '#FFFFFF', fontSize: '20px', marginBottom: '10px' }}>Premio</Typography>
                                                    <Typography style={{ fontFamily: 'Comfortaa Medium', color: '#FFFFFF' }}>Entre posicion 1-10: $5000</Typography>
                                                    <Typography style={{ fontFamily: 'Comfortaa Medium', color: '#FFFFFF' }}>Mayor a posicion  10: $1000</Typography>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    {/* <Grid item>
                                    <Typography style={{ fontFamily: 'Comfortaa Medium', color: '#FFFFFF' }}>Estas en la posición 10</Typography>
                                </Grid> */}

                                    <Grid item container direction="column" style={{ marginBottom: '20px' }}>
                                        {renderPartipantDetail()}
                                    </Grid>

                                    <Button id='button-ranking3' variant='contained' onClick={handleClose}>Atrás</Button>
                                </Grid>
                            </CardContent>
                        </Scrollbar>
                    </Card>
                </Modal>
            </>
        );
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
            >
                <Card id='card-ranking' className='unselectable'>
                    <Scrollbar style={{ width: '100%', height: '100%' }}>
                        <CardContent>
                            <Grid container spacing={4} justifyContent='center' alignContent='center' style={{ justifyItems:'center', alignItems:'center' }}>

                                <Grid item container justifyContent='center' alignContent='center'>
                                    <Typography style={{ fontFamily: 'Comfortaa Semibold', color: '#FFFFFF', fontSize: '25px' }}>Ranking</Typography>
                                    {/* {renderPodiumParticipants()} */}
                                </Grid>

                                <Grid item container justifyContent='center' alignContent='center'>
                                    <Typography style={{ fontFamily: 'Comfortaa Medium', color: '#FFFFFF', fontSize: '20px' }}>¡Ingresa tu correo electrónico para saber tu posición!</Typography>
                                    {/* {renderPodiumParticipants()} */}
                                </Grid>

                                <Grid item container justifyContent='center' alignContent='center' style={{ marginBottom: '50px', marginBottom: '50px' }}>
                                    <Card style={{ width: '100%', height: '150px', paddingTop:'20px' }}>
                                        <CardContent>
                                            <Formik
                                                initialValues={{ email: '' }}
                                                onSubmit={async (values, helpers) => {
                                                    // await request(values);
                                                    await sleep(3000)
                                                    console.log('values', values)
                                                    setIsCompleted(true)
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
                                                            <Field type='email' fullWidth name="email" component={TextField} label="Ingrese su mail" variant="outlined" InputLabelProps={{ style: { fontFamily: 'Comfortaa', fontSize: 14 } }} />
                                                        </Box>
                                                        <Grid container spacing={2} alignItems="center" justifyContent="center">
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
                                        ? <Grid item container direction='column' justifyContent='center' alignContent='center' style={{ marginTop: '50px', paddingBottom: '0px', justifyItems:'center', alignItems:'center' }}>
                                            <Typography style={{ fontFamily: 'Comfortaa Semibold', color: '#FFFFFF', fontSize: '20px', marginBottom: '30px' }}>Estás en la posición: 1 </Typography>
                                            <Typography style={{ fontFamily: 'Comfortaa Semibold', color: '#FFFFFF', fontSize: '20px' }}>Tu premio es: $5000 </Typography>
                                        </Grid>
                                        : null
                                    }
                                </Grid>


                                <ChildModal />
                            </Grid>
                        </CardContent>
                    </Scrollbar>
                </Card>
            </Modal>
        </>
    )
}

export default Ranking