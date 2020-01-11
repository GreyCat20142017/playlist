import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import {localforage as lf} from '../../localforage';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Typography
} from '@material-ui/core';

import MUITable from '../table/MUITable';
import {getTableActions} from '../../functions';
import AlertDialog from '../alert/alert';
import {LfPlaylistEditor} from './LfPlaylistEditor';
import {LIST_KEY} from '../../constants';
import {Add} from '@material-ui/icons';

const LfDialog = ({isLfOpen = false, setIsLfOpen, lists, setLists}) => {
    const [edited, setEdited] = useState(null);
    const [showForm, setShowForm] = useState(null);
    const [lfLists, setLfLists] = useState([]);
    const [alertIsOpen, setAlerIstOpen] = useState(false);

    useEffect(() => {
        if (isLfOpen) {
            lf.getItem(LIST_KEY)
                .then(data => setLfLists(data ? data : []))
                .catch((err) => {
                    setLfLists([]);
                    console.log(err.message);
                });
        }
    }, [isLfOpen]);

    const onClose = () => {
        setIsLfOpen(false);
    };

    const onDelete = (ind) => {
        const key = lfLists[ind]['key'];
        lf.removeItem(key).then(() => {
            setLfLists(lfLists.filter(el => el.key !== key));
            lf.getItem(LIST_KEY).then(lfdata => {
                const data = lfdata ? lfdata : [];
                lf.setItem(LIST_KEY, data.filter(el => el.key !== key));
            });
        });
    };

    const onEdit = (ind) => {
        setEdited({...lfLists[ind]});
    };

    const onCreate = () => {
        setEdited({key: null, title: ''});
    };

    const lfClear = () => {
        lf.clear().then(setLfLists([]));
    };

    const onClear = () => {
        setEdited(null);
        setAlerIstOpen(true);
    };

    return (
        <>
            <Dialog open={isLfOpen} onClose={onClose} aria-labelledby='form-dialog-title' fullScreen={true}>
                <DialogTitle id='form-dialog-title'>Редактирование локального списка плейлистов</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant='caption'>
                            Модифицируемый и сохраняемый в IndexedDB список плейлистов
                        </Typography>
                    </DialogContentText>
                    <Divider/>

                    {edited ?
                        <LfPlaylistEditor lfLists={lfLists} setLfLists={setLfLists}
                                          edited={edited} setEdited={setEdited}/>
                        :
                        <>
                            <IconButton onClick={onCreate} title={'добавить плейлист'}><Add/></IconButton>
                            <MUITable data={lfLists} size={'small'} rowsLimit={5} columns={['title', 'key']}
                                      tableTitle={'Список плейлистов'}
                                      hoverField={'title'} actions={getTableActions(onDelete, onEdit)}
                                      showForm={showForm} setShowForm={setShowForm}/>
                        </>
                    }

                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color='primary' variant='contained'
                            title={'Закрыть'}>
                        Закрыть список
                    </Button>
                    <Button onClick={onClear} variant='contained'
                            title={'Очистить локальный список плейлистов в IndexedDB'}>
                        Очистить список плейлистов
                    </Button>

                </DialogActions>
            </Dialog>

            <AlertDialog message={'очистить полностью IndexedDB со списком локальных плейлистов'}
                         alertIsOpen={alertIsOpen} setAlertIsOpen={setAlerIstOpen} callback={lfClear}/>
        </>
    );
};

LfDialog.propTypes = {
    isLfOpen: PropTypes.bool,
    setIsLfOpen: PropTypes.func.isRequired,
    lists: PropTypes.arrayOf(PropTypes.object).isRequired,
    setLists: PropTypes.func.isRequired
};

export default LfDialog;