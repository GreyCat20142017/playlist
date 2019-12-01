import React, {useState} from 'react';

import {Button, TextField, Divider, Typography} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import MUITable from '../table/MUITable';
import {isValidUrl} from '../../functions';

const Form = ({isFormOpen = false, setIsFormOpen, lists, setLists}) => {
        const [name, setName] = useState('');
        const [link, setLink] = useState('');
        const [errors, setErrors] = useState({});

        const onSave = () => {
            setIsFormOpen(false);
            console.log('save to LS');
        };

        const onClose = () => {
            setIsFormOpen(false);
        };

        const formValidate = (evt) => {
            evt.preventDefault();
            const linkError = (link.trim() === '') || !isValidUrl(link) ? 'Ссылка должна быть заполнена и быть корректной.' : null;
            const nameError = (name.trim() === '') ? 'Название должно быть заполнено' : null;
            setErrors({
                name: nameError,
                link: linkError
            });
            return () => addNew();
        };

        const addNew = () => {
            if (!errors['link'] && !errors['name']) {
                setLists([...lists, {
                    title: name,
                    href: link
                }]);
                setName('');
                setLink('');
                setErrors({});
            }
        };

        const changeName = (evt) => (setName(evt.target.value));
        const changeLink = (evt) => (setLink(evt.target.value));

        const errorMessage = Object.keys(errors).map(key => errors[key]).join(', ');

        return (
            <Dialog open={isFormOpen} onClose={onClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Добавление в список плейлистов</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        <Typography variant='caption'>
                            Для дополнения списка плейлистов нужно добавить название плейлиста и ссылку на файл плейлиста
                            (https://ИмяРесурса/ИмяФайла).
                            Файл с описанием плейлиста представляет собой массив объектов с полями 'title' и 'link' в
                            формате json.
                            Поле 'link' - ссылка на видео youtube, полученная через функцию 'ПОДЕЛИТЬСЯ'
                        </Typography>
                    </DialogContentText>
                    <Divider/>
                    <form onSubmit={formValidate}>
                        <TextField value={name} onChange={changeName} error={errors['name'] ? true : false}
                                   autoFocus margin='dense' id='title' label='Название плейлиста' type='text' fullWidth/>
                        <TextField value={link} onChange={changeLink} error={errors['link'] ? true : false}
                                   autoFocus margin='dense' id='link' label='Ссылка на файл плейлиста' type='text'
                                   fullWidth/>
                        <Button type='submit' style={{margin: '10px auto'}} variant='contained' color='primary' size='small'
                                onClick={formValidate}>
                            добавить
                        </Button>
                        <Divider/>
                        <Typography variant={'caption'} color={'error'}>{errorMessage}</Typography>
                    </form>

                    <MUITable data={lists} size={'small'} rowsLimit={5} columns={['title']} hoverField={'href'}/>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color='primary'>
                        Отмена
                    </Button>
                    <Button onClick={onSave} color='primary'>
                        Сохранить изменения в LocalStorage
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
;

export default Form;