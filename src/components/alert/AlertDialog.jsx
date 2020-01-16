import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

const AlertDialog = ({alertIsOpen, setAlertIsOpen, message = '', callback = null}) => {

    const onAlertClose = () => {
        setAlertIsOpen(false);
    };

    const onAlertAction = () => {
        setAlertIsOpen(false);
        if (callback) {
            callback();
        }
    };

    return (
        <Dialog open={alertIsOpen} onClose={onAlertClose}
                aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
            <DialogTitle id='alert-dialog-title'>{'ВНИМАНИЕ !'}</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    Вы уверены, что хотите {message} ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onAlertClose} color='primary' variant={'contained'} title='Не выполнять действие'
                        autoFocus>
                    Отказаться от выполнения
                </Button>
                <Button onClick={onAlertAction} color='primary' title='Внимание! Указанное действие будет выполнено!'>
                    Выполнить действие
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;