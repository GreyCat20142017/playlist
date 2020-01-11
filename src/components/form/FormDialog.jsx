import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import {localforage as lf} from '../../localforage';
import {
    Button, Divider, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';
import {Add} from '@material-ui/icons';

import MUITable from '../table/MUITable';
import Form from './Form';
import {getClearData, getFilteredData, getNewKey, getTableActions, setLocalPlaylists} from '../../functions';
import axios from 'axios';
import {LIST_KEY} from '../../constants';

const getContent = async (href) => {
    const res = await axios.get(href);
    try {
        return res ? getClearData(getFilteredData(res.data)) : [];
    } catch (err) {
        return [];
    }
};

const FormDialog = ({isFormOpen = false, setIsFormOpen, lists, setLists}) => {
    const [status, setStatus] = useState(null);
    const [edited, setEdited] = useState(null);
    const [jsonLists, setJsonLists] = useState([]);

    useEffect(() => {
        setJsonLists(lists.filter(list => list.fromJson));
    }, [lists, setJsonLists]);

    const onSave = () => {
        const result = setLocalPlaylists(lists);
        if (result) {
            setStatus(result);
        } else {
            setIsFormOpen(false);
            setEdited(null);
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
        setEdited({...lists[ind], 'index': ind});
    };

    const onCreate = () => {
        setEdited({ title: '', fromJson: true, 'index': -1});
    };

    const onExport = async (ind) => {
        const title = lists[ind]['title'];
        const content = await getContent(lists[ind]['href']);
        const key = getNewKey();
        lf.getItem(LIST_KEY).then(lfdata => {
            const data = lfdata ? lfdata : [];
            lf.setItem(LIST_KEY, [...data, {key, title}]).then(() => {
                    setLists([...lists, {title, fromJson: false}]);
                    lf.setItem(key, content);
                }
            );
        });
    };

    return (
        <Dialog open={isFormOpen} onClose={onClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>Редактирование списка Json-плейлистов</DialogTitle>
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

                {edited ?
                    <Form lists={lists} setLists={setLists}
                          edited={edited} setEdited={setEdited}/>
                    :
                    <>
                        <IconButton onClick={onCreate} title={'добавить'}><Add/></IconButton>
                        <MUITable data={jsonLists ? jsonLists : []} size={'small'} rowsLimit={5} columns={['title']}
                                  hoverField={'href'} actions={getTableActions(onDelete, onEdit, onExport)}/>
                    </>}
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

FormDialog.propTypes = {
    isFormOpen: PropTypes.bool,
    setIsFormOpen: PropTypes.func.isRequired,
    lists: PropTypes.arrayOf(PropTypes.object).isRequired,
    setLists: PropTypes.func.isRequired
};

export default FormDialog;