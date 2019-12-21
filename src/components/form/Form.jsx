import React, {useState, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {Button, Divider, TextField, Typography, Switch, FormControlLabel} from '@material-ui/core';

import {isValidUrl} from '../../functions';

const isFormValid = (err) => (!err || !(err['href'] || err['title']));

const isError = (errors, fieldName) => (errors && errors[fieldName]);

const Form = ({lists, setLists, edited = null, setEdited}) => {
    const [title, setTitle] = useState('');
    const [href, setHref] = useState('');
    const [fromJson, setFromJson] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState(null);

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
        const newList = edited ? lists.map(
            (item, ind) => (ind === edited.index ? {
                ...item,
                href: href,
                title: title
            } : item)) :
            [...lists, {
                title,
                href,
                fromJson: fromJson,
                content: fromJson ? null : []
            }];
        setLists(newList);
    };

    const formValidate = () => {
        const hrefError = fromJson && ((href.trim() === '') || !isValidUrl(href)) ? 'Ссылка должна быть заполнена и быть корректной.' : null;
        const titleError = (title.trim() === '') ? 'Название должно быть заполнено' : null;
        setErrors({
            title: titleError,
            href: hrefError
        });
    };

    const switchFromJson = () => (setFromJson(!fromJson));

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        setIsSubmitting(true);
        formValidate();
    };

    const onChangeTitle = (evt) => (setTitle(evt.target.value));

    const onChangeHref = (evt) => (setHref(evt.target.value));

    const errorMessage = errors ? Object.keys(errors).map(key => errors[key]).join(', ') : null;

    return (

        <form onSubmit={onFormSubmit}>
            <FormControlLabel
                control={
                    <Switch color={'primary'} checked={fromJson} disabled={true}
                            onChange={switchFromJson} value={'fromJson'}/>
                }
                label="Использовать Json (а не хранилище)"
            />
            <TextField value={title} onChange={onChangeTitle} error={isError(errors, 'title')}
                       autoFocus margin='dense' id='title' label='Название плейлиста' type='text' fullWidth/>

            <TextField value={href} onChange={onChangeHref} error={isError(errors, 'href')}
                       autoFocus margin='dense' id='href' label='Ссылка на файл плейлиста' type='text'
                       fullWidth disabled={!fromJson}/>

            <Button type='submit' style={{margin: '10px auto'}} variant='contained' color='primary' size='small'
                    onClick={onFormSubmit} title={'добавить в список (без сохранения в localStorage)'}>
                {edited ? 'изменить элемент' : 'добавить в список предварительно'}
            </Button>
            <Typography variant='caption'> без сохранения в localStorage!</Typography>
            <Divider/>
            <Typography variant={'caption'} color={'error'}>{errorMessage}</Typography>
        </form>
    );
};

Form.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.object).isRequired,
    setLists: PropTypes.func.isRequired,
    edited: PropTypes.object || null,
    setEdited: PropTypes.func.isRequired
};

export default Form;