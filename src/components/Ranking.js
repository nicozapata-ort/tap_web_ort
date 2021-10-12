import React, { useState } from 'react'
import { Button, Modal, Box, Card, CardContent, Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { getAllParticipants } from '../strapi/data.js'
import crown from '../crown2.png'
import { Scrollbar } from 'react-scrollbars-custom'


const Ranking = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)

    const participantes = getAllParticipants()


    return (
        <>
            <div className='App-description-button'>
                <Button
                    variant='contained'
                    style={{ backgroundColor: '#002350', color: '#FFFFFF', borderRadius: '25px', textTransform: 'none', fontFamily: 'Comfortaa', width: '80%', height: '45px' }}
                    onClick={handleOpen}
                >Ver ranking</Button>
            </div>

            <Modal
                open={openModal}
                onClose={handleClose}
            >
                <Card className='unselectable' style={{ position: 'absolute', width: '90vw', height: '59vh', backgroundColor: '#002350', top: '25%', bottom: 0, left: 0, right: 0, margin: '0 auto', borderRadius: '50px' }}>
                    <CardContent>
                        <Grid container justifyContent='center' alignItems='center'>

                            <Grid item direction='column' justifyContent='center' alignItems='center' container xs={3} md={2} style={{ textAlign: 'center', margin: '70px 0px 10px 0px' }}>
                                <Grid item style={{ width: '100px', height: '100px', borderRadius: '100px', borderColor: '#14D2B9', borderWidth: '4px', borderStyle: 'solid', backgroundColor: '#405A7C', textAlign: 'center', marginBottom: '10px' }}>
                                    <Box sx={{ display: 'flex', width: '92px', height: '92px', borderRadius: '92px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <Typography style={{ fontFamily: 'Comfortaa', fontSize: '18px' }}>2do</Typography>
                                        <Typography style={{ fontFamily: 'Comfortaa', fontSize: '12px', color: '#6EF1C7' }}>1020 puntos</Typography>
                                    </Box>
                                </Grid>
                                <Typography style={{ fontFamily: 'Comfortaa' }}>Javier L.</Typography>
                            </Grid>

                            <Grid item direction='column' justifyContent='center' alignItems='center' container direction='column' xs={6} md={3} style={{ textAlign: 'center', margin: '0px 0px 30px 0px' }}>
                                <img src={crown} alt='corona' height='50px' width='50px' />
                                <Grid item style={{ width: '150px', height: '150px', borderRadius: '150px', borderColor: '#14D2B9', borderWidth: '4px', borderStyle: 'solid', backgroundColor: '#405A7C', textAlign: 'center', marginBottom: '10px' }}>
                                    <Box sx={{ display: 'flex', width: '142px', height: '142px', borderRadius: '150px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <Typography style={{ fontFamily: 'Comfortaa', fontSize: '25px' }}>1ro</Typography>
                                        <Typography style={{ fontFamily: 'Comfortaa', fontSize: '14px', color: '#6EF1C7' }}>1390 puntos</Typography>
                                    </Box>
                                </Grid>
                                <Typography style={{ fontFamily: 'Comfortaa' }}>Roberto Elizabeth Ester M.</Typography>
                            </Grid>

                            <Grid item direction='column' justifyContent='center' alignItems='center' container xs={3} md={2} style={{ textAlign: 'center', margin: '70px 0px 10px 0px' }}>
                                <Grid item style={{ width: '100px', height: '100px', borderRadius: '100px', borderColor: '#14D2B9', borderWidth: '4px', borderStyle: 'solid', backgroundColor: '#405A7C', textAlign: 'center', marginBottom: '10px' }}>
                                    <Box sx={{ display: 'flex', width: '92px', height: '92px', borderRadius: '92px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <Typography style={{ fontFamily: 'Comfortaa', fontSize: '18px' }}>3ro</Typography>
                                        <Typography style={{ fontFamily: 'Comfortaa', fontSize: '12px', color: '#6EF1C7' }}>150 puntos</Typography>
                                    </Box>
                                </Grid>
                                <Typography style={{ fontFamily: 'Comfortaa' }}>Francisco Maximiliano G.</Typography>
                            </Grid>
                        </Grid>

                        {/* {participates.length > 3 } */}

                        <Grid
                            container
                            // spacing={2}
                            direction="column"
                        >
                            <Grid item style={{ textAlign: 'center', marginBottom:'8px' }}>
                                <Typography style={{ fontFamily: 'Comfortaa Semibold', color: '#49E3C1' }}>Precio: $5000 (1-10 pos.) | $1000 (>10 pos.)</Typography>
                            </Grid>
                            <Scrollbar style={{ width: '100%', height: '200px' }}>
                                <List>
                                    {/* <Grid container direction='row' justifyContent='center' alignItems='center' style={{ backgroundColor: '#405A7C', borderRadius: '100px', padding: '15px', marginBottom: '30px' }}>
                                        <Grid item xs={6} md={6} style={{ textAlign: 'center' }}>
                                            <Typography style={{ fontFamily: 'Comfortaa' }}>Tu posición es la nro 10</Typography>
                                            <Typography style={{ fontFamily: 'Comfortaa' }}>Tenés 1290 puntos  </Typography>
                                        </Grid>
                                    </Grid> */}
                                    {participantes.map(function (participante, pos) {
                                        return (
                                            <ListItem key={pos} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#405A7C', marginBottom: '10px', borderRadius: '100px', padding: '15px' }}>

                                                <Grid item xs={2} md={3}>
                                                    <div style={{ display: 'flex', width: '30px', height: '30px', borderRadius: '30px', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Typography style={{ fontFamily: 'Comfortaa', color: '#405A7C' }}>{pos + 1}</Typography>
                                                    </div>
                                                </Grid>

                                                <Grid item xs={6} md={6} style={{ textAlign: 'center' }}>
                                                    <Typography style={{ fontFamily: 'Comfortaa' }}>{`${participante.nombre} ${participante.apellido[0]}.`}</Typography>
                                                </Grid>

                                                <Grid item xs={3} md={3} style={{ textAlign: 'center' }}>
                                                    <Typography style={{ fontFamily: 'Comfortaa', color: '#6EF1C7' }}>{`${participante.referidos} puntos`}</Typography>
                                                </Grid>

                                            </ListItem>
                                            // <Grid key={pos} container direction='row' justifyContent='center' alignItems='center' style={{ backgroundColor: '#405A7C', marginBottom: '10px', borderRadius: '100px', padding: '15px' }}>


                                            // </Grid>
                                        )
                                    })}

                                </List>
                            </Scrollbar>
                        </Grid>
                    </CardContent>
                </Card>


                {/* <Box style={{width:'50vw', height:'50vh', backgroundColor:'#FFFFFF', margin: '0 auto'}}>
            </Box> */}
            </Modal>
        </>
    )
}

export default Ranking