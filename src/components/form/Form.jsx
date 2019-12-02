import React, {useState} from 'react';

import {Button, Divider, TextField, Typography, Switch, FormControlLabel} from '@material-ui/core';
import * as PropTypes from 'prop-types';
import {isValidUrl} from '../../functions';

const DEFAULT_ERRORS_STATE = {
    title: null,
    href: null
};

const isFormValid = (err) => (!(err['href'] || err['title']));

const Form = ({lists, setLists}) => {
    const [title, setTitle] = useState('');
    const [href, setHref] = useState('');
    const [fromJson, setFromJson] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({...DEFAULT_ERRORS_STATE});

    const addNew = () => {
        if (isFormValid(errors) && isSubmitting) {
            setLists([...lists, {
                title,
                href,
                fromJson: fromJson,
                content: fromJson ? null : []
            }]);
            setTitle('');
            setHref('');
            setErrors({...DEFAULT_ERRORS_STATE});
            setIsSubmitting(false);
        }
    };

    const formValidate = () => {
        const hrefError =  fromJson && ((href.trim() === '') || !isValidUrl(href)) ? 'Ссылка должна быть заполнена и быть корректной.' : null;
        const titleError = (title.trim() === '') ? 'Название должно быть заполнено' : null;
        setErrors({
            title: titleError,
            href: hrefError
        });
        return addNew();
    };

    const switchFromJson = () => (setFromJson(!fromJson));

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        setIsSubmitting(true);
        formValidate();
    };

    const onChangeTitle = (evt) => (setTitle(evt.target.value));
    const onChangeHref = (evt) => (setHref(evt.target.value));

    const errorMessage = Object.keys(errors).map(key => errors[key]).join(', ');

    return (

        <form onSubmit={onFormSubmit}>
            <FormControlLabel
                control={<Switch color={'primary'} checked={fromJson} onChange={switchFromJson} value={'fromJson'}/>}
                label="Использовать Json (а не хранилище)"
            />
            <TextField value={title} onChange={onChangeTitle} error={errors['title'] ? true : false}
                       autoFocus margin='dense' id='title' label='Название плейлиста' type='text' fullWidth/>

            <TextField value={href} onChange={onChangeHref} error={errors['href'] ? true : false}
                       autoFocus margin='dense' id='href' label='Ссылка на файл плейлиста' type='text'
                       fullWidth disabled={!fromJson}/>

            <Button type='submit' style={{margin: '10px auto'}} variant='contained' color='primary' size='small'
                    onClick={onFormSubmit}>
                добавить
            </Button>
            <Divider/>
            <Typography variant={'caption'} color={'error'}>{errorMessage}</Typography>
        </form>
    );
};

Form.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.object),
    setLists: PropTypes.func,
};

export default Form;