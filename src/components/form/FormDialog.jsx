import React from 'react';

import {Button, Divider, Typography} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import MUITable from '../table/MUITable';
import Form from './Form';

const FormDialog = ({isFormOpen = false, setIsFormOpen, lists, setLists}) => {
    const onSave = () => {
        setIsFormOpen(false);
        console.log('save to LS');
    };

    const onClose = () => {
        setIsFormOpen(false);
    };

    return (
        <Dialog open={isFormOpen} onClose={onClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>Редактирование списка плейлистов</DialogTitle>
            <DialogActions>
                <Button onClick={onClose} color='primary'>
                    Отмена
                </Button>
                <Button onClick={onSave} color='primary'>
                    Сохранить изменения в LocalStorage
                </Button>
            </DialogActions>
            <DialogContent>
                <DialogContentText>
                    <Typography variant='caption'>
                        Для дополнения списка плейлистов нужно добавить название плейлиста и ссылку на описание
                        плейлиста (https://ИмяРесурса или /data/Файл.json)
                        Содержимое файла с описанием плейлиста представляет собой массив объектов с полями 'title' и
                        'link' в формате json.
                        Поле 'link' - ссылка на видео youtube, полученная через функцию 'ПОДЕЛИТЬСЯ'
                    </Typography>
                </DialogContentText>
                <Divider/>

                <Form lists={lists} setLists={setLists}/>

                <MUITable data={lists} size={'small'} rowsLimit={5} columns={['title']} hoverField={'href'}/>
            </DialogContent>


        </Dialog>
    );
};

export default FormDialog;