import React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Typography
} from '@material-ui/core';
import {Add} from '@material-ui/icons';

import {LfPlaylistEditor} from './LfPlaylistEditor';
import MUITable from '../table/MUITable';
import {getTableActions} from '../../functions';

export const LfDialog = ({
                             lfLists, setLfLists, edited, setEdited, isLfOpen,
                             showForm, setShowForm,
                             onClose, onDelete, onEdit, onCreate, onClear
                         }) => (


    <>
        <Dialog open={isLfOpen} onClose={onClose} aria-labelledby='form-dialog-title' fullScreen={true}
                style={{textAlign: 'center'}}>
            <div style={{
                width: '100%', maxWidth: '740px', margin: '0 auto',
                display: 'flex', flexDirection: 'column', flexGrow: 1
            }}>

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
                            <MUITable data={lfLists} size={'small'} rowsLimit={5} columns={['title', 'href']}
                                      tableTitle={'Список плейлистов'}
                                      hoverField={'title'} actions={getTableActions(onDelete, onEdit)}
                                      showForm={showForm} setShowForm={setShowForm}/>
                        </>
                    }

                </DialogContent>

                <DialogActions style={{marginTop: 'auto'}}>
                    <Button onClick={onClose} color='primary' variant='contained'
                            title={'Закрыть'}>
                        Закрыть список
                    </Button>
                    <Button onClick={onClear} variant='contained'
                            title={'Очистить локальный список плейлистов в IndexedDB'}>
                        Очистить список плейлистов
                    </Button>

                </DialogActions>
            </div>
        </Dialog>
    </>
);