import React, {useState, useContext} from "react"
import { texts } from '../assets/texts/strings.js'
import { Card, CardContent, Button, Grid, Modal, Typography } from '@material-ui/core'
import { Scrollbar } from 'react-scrollbars-custom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import FormContext from '../context/Form/FormContext.js'
import PromotionContext from '../context/Promotion/PromotionContext.js'

export const MessageCoupon = () => {
    const { promotion } = useContext(PromotionContext);
    const { coupon, openModal, setOpenModal } = useContext(FormContext);
    const [copyTextLink, setCopyTextLink] = useState({ copied: false });
    const [copyTextCoupon, setCopyTextCoupon] = useState({ copied: false });
    const handleClose = () => setOpenModal(false)


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