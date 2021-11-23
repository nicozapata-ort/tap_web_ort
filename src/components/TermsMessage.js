import React, { useContext } from "react"
import { texts } from '../assets/texts/strings.js'
import { Card, CardContent, Grid, Modal, Typography } from '@material-ui/core'
import { Scrollbar } from 'react-scrollbars-custom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import FormContext from '../context/Form/FormContext.js'
import PromotionContext from "../context/Promotion/PromotionContext.js";

export const TermsMessage = () => {
    const { openTermsModal, setOpenTermsModal } = useContext(FormContext);
    const { promotion } = useContext(PromotionContext);
    const handleCloseTerms = () => setOpenTermsModal(false)


    return (
        <Modal
            open={openTermsModal}
            onClose={handleCloseTerms}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Card id='message-terms-card'>
                <Scrollbar>
                    <CardContent>
                        <Grid container spacing={4} direction="column" style={{ ...styles.gridContainer }}>

                            <Grid item container direction='row' style={{ ...styles.gridContainer, marginTop: '30px', height: '5vh' }}>
                                <Grid item container style={{ justifyContent: 'space-between' }}>
                                    <Grid item >
                                        <IconButton aria-label="Volver" sx={{ color: '#FFFFFF' }} onClick={handleCloseTerms}>
                                            <ArrowBackIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item style={{ ...styles.gridContainer, textAlign: 'center' }}>
                                <Typography id='terms-title' style={styles.textTitle}>{`${texts.TITLE_OF_TERMS}`}</Typography>
                            </Grid>

                            {promotion && promotion.expired === false && promotion.couponsAvailabes
                                ?
                                <Grid item container direction='column' style={{ ...styles.gridContainer, textAlign: 'center', margin: '0 auto' }}>
                                    <Typography id='terms-desc' style={{ color: '#FFFFFF', fontSize: '1rem', margin: '5px auto', whiteSpace:'pre-line' }}>{promotion.descriptionTermsAndConditions}</Typography>
                                </Grid>

                                : null
                            }
                        </Grid>
                    </CardContent>
                </Scrollbar>
            </Card>
        </Modal>
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
    },
    textTitle: {
        color: '#FFFFFF',
        fontSize: '25px'
    }
}