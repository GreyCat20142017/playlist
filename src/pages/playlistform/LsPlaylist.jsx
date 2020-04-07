import React, {useState, useEffect} from 'react';
import {Button, Divider, TextField, Typography} from '@material-ui/core';

import {getNewKey, isValidUrl, setLocalPlaylists} from '../../functions';
import {PLAYLIST_TYPE} from '../../constants';
import {useStyles} from './playlistform.css';

const isFormValid = (err) => (!err || !(err['href'] || err['title']));

const isError = (errors, fieldName) => (errors && errors[fieldName]);


const LsPlaylist = ({lists, setLists, edited = null, setEdited}) => {
    const [title, setTitle] = useState('');
    const [href, setHref] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        if (isFormValid(errors) && isSubmitting) {
            changeList();
            resetState();
        }
    });

    useEffect(() => {
        if (!isSubmitting) {
            setTitle(edited ? (edited['title'] || '') : '');
            setHref(edited ? (edited['href'] || '') : '');
        }
    }, [edited, isSubmitting]);


    const resetState = () => {
        setTitle('');
        setHref('');
        setIsSubmitting(false);
        setEdited(null);
    };

    const changeList = () => {
        const newList = edited  && edited.index !== -1 ? lists.map(
            (item, ind) => (ind === edited.index ? {
                ...item,
                href: href,
                title: title
            } : item)) :
            [...lists, {
                title,
                href,
                type: PLAYLIST_TYPE.JSON,
                key: getNewKey()

            }];
        setLists(newList);
        setLocalPlaylists(newList);
    };

    const formValidate = () => {
        const hrefError = ((href.trim() === '') || !isValidUrl(href)) ? 'Ссылка должна быть заполнена и быть корректной.' : null;
        const titleError = (title.trim() === '') ? 'Название должно быть заполнено' : null;
        setErrors({
            title: titleError,
            href: hrefError
        });
    };

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        setIsSubmitting(true);
        formValidate();
    };

    const onChangeTitle = (evt) => (setTitle(evt.target.value));

    const onChangeHref = (evt) => (setHref(evt.target.value));

    const errorMessage = errors ? Object.keys(errors).map(key => errors[key]).join(', ') : null;

    return (

        <form className={classes.lsForm} onSubmit={onFormSubmit}>
            <Typography variant={'caption'}>
                Для дополнения списка плейлистов нужно добавить название плейлиста и ссылку на описание
                плейлиста (https://ИмяРесурса или data/Файл.json)
                Содержимое файла с описанием плейлиста представляет собой массив объектов с полями 'title' и
                'link' в формате json.
                Поле 'link' - ссылка на видео youtube, полученная через функцию 'ПОДЕЛИТЬСЯ'
            </Typography>
            <TextField value={title} onChange={onChangeTitle} error={!!isError(errors, 'title')}
                       autoFocus margin='dense' id='title' label='Название плейлиста' type='text' fullWidth/>

            <TextField value={href} onChange={onChangeHref} error={!!isError(errors, 'href')}
                       autoFocus margin='dense' id='href' label='Ссылка на файл плейлиста' type='text'
                       fullWidth/>

            <Button onClick={resetState} title={'Отмена незавершенного действия'}>Отмена</Button>
            <Button type='submit' style={{margin: '10px auto'}} variant='contained' color='primary' size='small'
                    onClick={onFormSubmit} title={'Сохранить плейлист'}>
                {'сохранить Json-плейлист'}
            </Button>
            <Divider/>
            <Typography variant={'caption'} color={'error'}>{errorMessage}</Typography>
        </form>
    );
};

export default LsPlaylist;