import React, {useState} from 'react'
import { Button, Modal, Box, Card, CardContent, Grid } from '@material-ui/core'
import { getAllParticipants } from '../strapi/data.js'


const Ranking = () => {
    const [openModal, setOpenModal] = useState();
    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)
  
    const participantes = getAllParticipants()
  

    return (
        <>
            <div className='App-description-button'>
                <Button
                    variant='contained'
                    style={{ backgroundColor: '#002350', color: '#FFFFFF', borderRadius: '25px', textTransform: 'none', fontFamily: 'Comfortaa', width: '80%', height: '70%' }}
                    onClick={handleOpen}
                >Ver ranking</Button>
            </div>

            <Modal
                open={openModal}
                onClose={handleClose}
            >
                <Card style={{ position: 'absolute', width: '90vw', height: '50vh', backgroundColor: '#002350', top: '25%', bottom: 0, left: 0, right: 0, margin: '0 auto' }}>
                    <CardContent>
                        <Box style={{ width: '10vw', height: '10vh', backgroundColor: 'red', margin: '0 auto' }}>
                        </Box>
                        <Grid
                            container
                            spacing={2}
                            direction="column"
                        >
                            {participantes.map(function (participante, pos) {
                                return (
                                    <Grid container direction='row' xs={12} style={{ backgroundColor: '#405A7C', marginBottom: '10px', borderRadius: '100px' }}>
                                        <Grid container direction='row' style={{ display: 'flex', justifyContent: 'center', alingItems: 'center' }}>
                                            <Grid item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', width: '30px' }}>
                                                <div style={{ display: 'flex', width: '30px', height: '30px', borderRadius: '30px', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', fontFamily: 'Comfortaa' }}>{pos + 1}</div>
                                            </Grid>
                                            <Grid item>
                                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginRight: '10px', fontFamily: 'Comfortaa', color:'#FFFFFF' }}>
                                                    <h4>{`${participante.nombre} ${participante.apellido[0]}.`}</h4>
                                                </div>
                                            </Grid>
                                            <Grid item>
                                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontFamily: 'Comfortaa', color: '#6EF52B' }}>
                                                    <h4>{`${participante.referidos} puntos`}</h4>
                                                </div>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                )
                            })}
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