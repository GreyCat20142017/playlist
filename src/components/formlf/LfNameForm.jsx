import React from 'react';
import {useForm} from 'react-hook-form';
import * as PropTypes from 'prop-types';
import {Button, TextField, Typography} from '@material-ui/core';
import {isError} from '../../functions';

const LfNameForm = ({title, onSaveTitle, change = false}) => {
    const methods = useForm();
    const {handleSubmit, register, errors} = methods;

    const onSubmit = data => {
        if (data && data['title']) {
            onSaveTitle(data['title']);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h6' component='p'>
                {change ? 'Изменение названия плейлиста' : 'Добавление нового плейлиста'}
            </Typography>
            <TextField defaultValue={title} variant='outlined'
                       name='title' inputRef={register({required: true})} error={!!isError(errors, 'title')}
                       margin='dense' id='title' label='Название плейлиста' type='text' fullWidth/>
            <Button type='submit' color='primary' variant='contained' fullWidth title='сохранить и закрыть'>
                сохранить
            </Button>
        </form>
    );
};

LfNameForm.propTypes = {
    title: PropTypes.string.isRequired,
    onSaveTitle: PropTypes.func.isRequired,
    change: PropTypes.bool
};

export default LfNameForm;