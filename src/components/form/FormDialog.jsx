import React, {useState} from 'react';

import {Button, Divider, Typography} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import MUITable from '../table/MUITable';
import Form from './Form';
import {getTableActions, setLocalPlaylists} from '../../functions';

const FormDialog = ({isFormOpen = false, setIsFormOpen, lists, setLists}) => {
    const [status, setStatus] = useState(null);
    const [edited, setEdited] = useState(null);

    const onSave = () => {
        const result = setLocalPlaylists(lists);
        if (result) {
            setStatus(result);
        } else {
            setIsFormOpen(false);
        }
    };

    const onClose = () => {
        setIsFormOpen(false);
    };

    const onDelete = (ind) => {
       const newLists = [...lists];
       newLists.splice(ind, 1);
       setLists(newLists);
    };

    const onEdit = (ind) => {
        setEdited({...lists[ind], 'index' : ind});
    };

    return (
        <Dialog open={isFormOpen} onClose={onClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>Редактирование списка плейлистов</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography variant='caption'>
                        Для дополнения списка плейлистов нужно добавить название плейлиста и ссылку на описание
                        плейлиста (https://ИмяРесурса или data/Файл.json)
                        Содержимое файла с описанием плейлиста представляет собой массив объектов с полями 'title' и
                        'link' в формате json.
                        Поле 'link' - ссылка на видео youtube, полученная через функцию 'ПОДЕЛИТЬСЯ'
                    </Typography>
                </DialogContentText>
                <Divider/>

                <Form lists={lists} setLists={setLists} edited={edited} setEdited={setEdited}/>

                <MUITable data={lists} size={'small'} rowsLimit={5} columns={['title']}
                          hoverField={'href'} actions={getTableActions(onDelete, onEdit)}/>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color='primary'
                        title={'Закрыть без сохранения изменений. При обновлении страницы все изменения будут потеряны!'}>
                    Закрыть
                </Button>
                <Button onClick={onSave} color='primary' variant='contained' title={'сохранить список в хранилище'}>
                    Сохранить изменения в LocalStorage
                </Button>

            </DialogActions>
            <Typography variant='caption'>{status}</Typography>

        </Dialog>
    );
};

export default FormDialog;