import React, {useState} from 'react';
import axios from 'axios';
import {Paper, Typography} from '@material-ui/core';

import PlaylistEditor from './PlaylistEditor';
import PlaylistDialogControls from './PlaylistDialogControls';
import {AlertDialog} from '../components';
import {ALERT_TYPES, LOCAL_STORAGE, PLAYLIST_TYPE} from '../../constants';
import {getClearData, getFilteredData, getNewKey, setLocalPlaylists} from '../../functions';
import {useDB} from '../../hooks/customHooks';

const getJsonContent = async (href) => {
    const res = await axios.get(href);
    try {
        return res ? getClearData(getFilteredData(res.data)) : [];
    } catch (err) {
        return [];
    }
};

export const PlaylistDialog = ({lists, setLists}) => {
    const [edited, setEdited] = useState(null);
    const [alert, setAlert] = useState(false);

    const [, {exportToLf, clearStorage, getDbContent, deletePlaylist}] = useDB(false);

    const onDelete = (ind) => {
        if (lists[ind]['type'] === PLAYLIST_TYPE.LF) {
            deletePlaylist(lists[ind]['href'], lists, setLists);
        } else if (lists[ind]['type'] === PLAYLIST_TYPE.JSON) {
            const newLists = [...lists];
            newLists.splice(ind, 1);
            setLists(newLists);
            setLocalPlaylists(newLists);
        }
    };

    const onEdit = (ind) => {
        setEdited({...lists[ind], 'index': ind});
    };

    const onCreateJson = () => {
        setEdited({title: '', type: PLAYLIST_TYPE.JSON, 'index': -1});
    };

    const onCreate = () => {
        setEdited({title: '', type: PLAYLIST_TYPE.LF, 'index': -1, href: getNewKey()});
    };

    const onExport = async (ind) => {
        const {type, title, href} = lists[ind];
        const content = (type === PLAYLIST_TYPE.LF) ? await getDbContent(href) :  await getJsonContent(href);
        const key = getNewKey();
        exportToLf(key, title, content, lists, setLists);
    };

    const lfClear = () => {
        clearStorage(lists, setLists);
    };

    const lsClear = () => {
        window.localStorage.removeItem(LOCAL_STORAGE);
        setLists(lists.filter(el => el.type !== PLAYLIST_TYPE.JSON));
    };

    const controlProps = {lists, onCreate, onCreateJson, onDelete, onEdit, onExport, setAlert};

    return (
        <Paper>
            <Typography variant={'h6'}>Редактирование списка плейлистов</Typography>
            {edited ?
                <PlaylistEditor lists={lists} setLists={setLists}
                                edited={edited} setEdited={setEdited}/>
                :
                <PlaylistDialogControls {...controlProps}/>
            }

            {alert && alert === ALERT_TYPES.LS &&
            <AlertDialog message={'полностью удалить из LocalStorage список Json-плейлистов'}
                         alert={alert === ALERT_TYPES.LS} setAlert={setAlert}
                         callback={lsClear}/>
            }
            {alert && alert === ALERT_TYPES.LF &&
            <AlertDialog message={'полностью очистить IndexedDB со списком локальных плейлистов'}
                         alert={alert === ALERT_TYPES.LF} setAlert={setAlert}
                         callback={lfClear}/>
            }
        </Paper>
    );
};