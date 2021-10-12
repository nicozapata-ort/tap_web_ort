import React, { useState, useEffect } from 'react'
import { Button, Modal, Box, Card, CardContent, Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { getAllParticipants, getAllParticipants2 } from '../strapi/data.js'
import crown from '../crown2.png'
import { Scrollbar } from 'react-scrollbars-custom'


const Ranking = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)
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
                    <Grid item container direction='column' justifyContent='center' alignItems='center' xs={3} md={2} style={{ textAlign: 'center', margin: '70px 0px 10px 0px' }}>
                        <Grid id='segunda-posicion-ranking' item>
                            <Box id='container-description-seg-pos'>
                                <Typography style={{ fontFamily: 'Comfortaa', fontSize: '18px' }}>2do</Typography>
                                <Typography style={{ fontFamily: 'Comfortaa', fontSize: '12px', color: '#6EF1C7' }}>{participantes[1].Referidos}</Typography>
                            </Box>
                        </Grid>
                        <Typography style={{ fontFamily: 'Comfortaa' }}>{`${participantes[1].Nombre} ${participantes[1].Apellido[0]}.`}</Typography>
                    </Grid>

                    <Grid item direction='column' justifyContent='center' alignItems='center' container direction='column' xs={6} md={3} style={{ textAlign: 'center', margin: '0px 0px 30px 0px' }}>
                        <img src={crown} alt='corona' height='50px' width='50px' />
                        <Grid id='primera-posicion-ranking' item>
                            <Box id='container-description-prim-pos'>
                                <Typography style={{ fontFamily: 'Comfortaa', fontSize: '25px' }}>1ro</Typography>
                                <Typography style={{ fontFamily: 'Comfortaa', fontSize: '14px', color: '#6EF1C7' }}>{participantes[0].Referidos}</Typography>
                            </Box>
                        </Grid>
                        <Typography style={{ fontFamily: 'Comfortaa' }}>{`${participantes[0].Nombre} ${participantes[0].Apellido[0]}.`}</Typography>
                    </Grid>

                    <Grid item direction='column' justifyContent='center' alignItems='center' container xs={3} md={2} style={{ textAlign: 'center', margin: '70px 0px 10px 0px' }}>
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
            <Scrollbar style={{ width: '100%', height: '200px' }}>
                <List>
                    {/* <Grid container direction='row' justifyContent='center' alignItems='center' style={{ backgroundColor: '#405A7C', borderRadius: '100px', padding: '15px', marginBottom: '30px' }}>
                            <Grid item xs={6} md={6} style={{ textAlign: 'center' }}>
                                <Typography style={{ fontFamily: 'Comfortaa' }}>Tu posición es la nro 10</Typography>
                                <Typography style={{ fontFamily: 'Comfortaa' }}>Tenés 1290 puntos  </Typography>
                            </Grid>
                        </Grid> */}
                    {
                        participantes.length > 3
                            ?
                            participantes.filter((part, pos) => pos > 2 ? part : null).map(function (participante, pos) {
                                return (
                                    <ListItem className='list-item-ranking' key={pos}>

                                        <Grid item xs={2} md={2}>
                                            <div className='circle-pos-item'>
                                                <Typography style={{ fontFamily: 'Comfortaa', color: '#405A7C' }}>{pos + 1}</Typography>
                                            </div>
                                        </Grid>

                                        <Grid item xs={6} md={8} style={{ textAlign: 'center' }}>
                                            <Typography style={{ fontFamily: 'Comfortaa' }}>{`${participante.Nombre} ${participante.Apellido[0]}.`}</Typography>
                                        </Grid>

                                        <Grid item xs={3} md={2} style={{ textAlign: 'center' }}>
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


    return (
        <>
            <div className='App-description-button'>
                <Button id='button-ranking' variant='contained' onClick={handleOpen}>Ver ranking</Button>
            </div>

            <Modal open={openModal} onClose={handleClose}>
                <Card id='card-ranking' className='unselectable'>
                    <CardContent>
                        <Grid container justifyContent='center' alignItems='center'>
                            <Grid item container justifyContent='center' alignItems='center'>
                                {renderPodiumParticipants()}
                            </Grid>

                            <Grid item container direction="column">
                                <Grid item style={{ textAlign: 'center', marginBottom: '8px' }}>
                                    <Typography style={{ fontFamily: 'Comfortaa Semibold', color: '#49E3C1' }}>Precio: $5000 (1-10 pos.) | $1000 (mayor a 10 pos.)</Typography>
                                </Grid>
                                {renderPartipantDetail()}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Modal>
        </>
    )
}

export default Ranking