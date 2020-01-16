import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Divider, IconButton, Typography} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import {localforage as lf} from '../../localforage';

import LfForm from './LfForm';
import MUITable from '../table/MUITable';
import MUIIcon from '../icon/MUIIcon';
import LfNameForm from './LfNameForm';
import {JsonViewer} from './JsonViewer';
import {LIST_KEY} from '../../constants';
import {getNewKey, getTableActions, isValidIndex} from '../../functions';

export const LfPlaylistEditor = ({lfLists, setLfLists, edited, setEdited}) => {
    const [content, setContent] = useState([]);
    const [title, setTitle] = useState('');
    const [track, setTrack] = useState('');
    const [playlistKey, setPlaylistKey] = useState(null);
    const [showJson, setShowJson] = useState(false);
    const [editTitle, setEditTitle] = useState(false);

    useEffect(() => {
        const currentKey = edited['key'];
        if (currentKey) {
            lf.getItem(currentKey).then(el => {
                if (el && Array.isArray(el)) {
                    setContent([...el]);
                    setTitle(edited['title']);
                }
            });
        }
        setPlaylistKey(currentKey);
    }, [edited]);

    const onDeleteTrack = (ind) => {
        setContent(content.filter((el, index) => (index !== ind)));
    };

    const onEditTrack = (ind) => {
        if (content[ind]) {
            setTrack({...content[ind], ind});
        }
    };

    const onCreateTrack = () => {
        setTrack({title: '', link: '', ind: -1});
    };

    const onSaveTrack = (title, link, ind) => {
        const changedContent = [...content];
        if (isValidIndex(ind, changedContent)) {
            changedContent[ind] = {title, link};
        } else {
            changedContent.push({title, link});
        }
        setTrack(null);
        setContent(changedContent);
    };

    const onCancel = () => {
        setEdited(false);
        setShowJson(false);
        setEditTitle(false);
    };

    const onSave = () => {
        const playlistKey = edited['key'];
        setEdited(false);
        lf.setItem(playlistKey, [...content]).then().catch();
    };

    const onExportToJson = () => {
        setShowJson(true);
    };

    const addPlaylist = (data, key, title) => {
        const element = {key, title};
        lf.setItem(LIST_KEY, [...data, element]).then(() => {
                setPlaylistKey(key);
                setLfLists([...data, element]);
                setEdited(element);
            }
        );
    };

    const renamePlaylist = (data, key, title) => {
        const el = data.find(el => el.key === playlistKey);
        if (el) {
            el['title'] = title;
            lf.setItem(LIST_KEY, [...data]);
            setLfLists([...data]);
            setEdited(null);
        }
    };

    const onSaveTitle = (title) => {
        const key = (playlistKey) ? playlistKey : getNewKey();
        lf.getItem(LIST_KEY).then(lfdata => {
            const data = lfdata ? [...lfdata] : [];
            if (playlistKey) {
                renamePlaylist(data, key, title);
            } else {
                addPlaylist(data, key, title);
            }
        });
        setTitle(title);
        setEditTitle(false);
    };

    const onChangeName = () => {
        setEditTitle(true);
    };

    return (
        showJson ?
            <JsonViewer content={content} setShowJson={setShowJson}/>
            :
            <>
                {!playlistKey || editTitle ?
                    <LfNameForm title={title} onSaveTitle={onSaveTitle} change={!!playlistKey}/> :
                    <>
                        <IconButton onClick={onCreateTrack} title={'добавить трек'}><Add/></IconButton>
                        <IconButton onClick={onChangeName} title={'изменить название плейлиста'}>
                            <MUIIcon icon={'Edit'}/>
                        </IconButton>
                        <IconButton onClick={onExportToJson} title={'вывести в формате в JSON'}>
                            <MUIIcon icon={'Storage'}/>
                        </IconButton>
                        <MUITable data={content} size={'small'} TracksLimit={5} columns={['title', 'link']}
                                  tableTitle={'Содержимое плейлиста "' + title + '"'}
                                  hoverField={'title'} actions={getTableActions(onDeleteTrack, onEditTrack)}/>
                    </>
                }
                {track && <LfForm track={track} setTrack={setTrack} onSaveTrack={onSaveTrack}/>}
                <ButtonGroup style={{marginTop: '10px'}}>
                    <Button onClick={onCancel} title='вернуться к списку без сохранения текущего плейлиста'>
                        назад к списку плейлистов
                    </Button>
                    <Button onClick={onSave} title='сохранмть м вернуться к списку' color={'primary'} variant={'contained'}>
                        !!! сохранить текущий плейлист !!!
                    </Button>
                </ButtonGroup>
                <Divider style={{margin: '10px 0'}}/>
                <Typography variant={'caption'}>После изменения состава плейлиста, нужно воспользоваться кнопкой
                    "Сохранить
                    текущий плейлист" для сохранения списка в IndexedDB</Typography>
            </>
    );
};