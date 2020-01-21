import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import * as PropTypes from 'prop-types';
import {Button, TextField, Typography} from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {extractYoutubeId, isMaybeYoutubeId, isValidUrl, isYoutubeUrl} from '../../functions';
import {useStyles} from './LfForm.css';

const isError = (errors, fieldName) => (errors && errors[fieldName]);

const LfForm = ({track = null, setTrack, onSaveTrack}) => {
    const classes = useStyles();
    const [error, setError] = useState(false);
    const methods = useForm();
    const {handleSubmit, register, errors} = methods;

    const onSubmit = data => {
        const url = (data && data['link']) || '';
        if ((isValidUrl(url) && isYoutubeUrl(url)) || isMaybeYoutubeId(url)) {
            onSaveTrack(data['title'], extractYoutubeId(url), track['ind']);
        } else {
            setError(true);
        }
    };

    return (
        <form className={classes.lfForm} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h6' component='p'>
                {track['ind'] >= 0 ? 'Изменение трека' : 'Добавление трека'}
            </Typography>
            <TextField className={classes.textField} defaultValue={track ? track['title'] || '' : ''} variant='filled'
                       name='title' inputRef={register({required: true})} error={!!isError(errors, 'title')}
                       margin='dense' id='title' label='Название трека' type='text' fullWidth autoFocus/>
            <TextField className={classes.textField} defaultValue={track ? track['link'] || '' : ''} variant='filled'
                       name='link' inputRef={register({required: true})} error={!!isError(errors, 'link')}
                       margin='dense' id='link' label='Ссылка youtube' type='text' fullWidth/>

            <Typography variant='caption' component='p' color={error ? 'error' : 'inherit'}>
                Ссылка на видео yotube должна быть в формате https://youtu.be/ID
            </Typography>
            <Typography variant='caption' component='p' color={error ? 'error' : 'inherit'}>
                Ссылку нужного формата можно получить через функцию ПОДЕЛИТЬСЯ на youtube
            </Typography>

            <ButtonGroup className={classes.buttonGroup}>
                <Button type='submit' color='secondary' variant='contained' fullWidth title='сохранить и закрыть'>
                    сохранить
                </Button>
                <Button color='secondary' variant='contained' fullWidth title=' закрыть'
                        onClick={() => setTrack(null)}>
                    отмена
                </Button>
            </ButtonGroup>
        </form>
    );
};

LfForm.propTypes = {
    track: PropTypes.object || null,
    setTrack: PropTypes.func.isRequired,
    onSaveTrack: PropTypes.func.isRequired
};

export default LfForm;