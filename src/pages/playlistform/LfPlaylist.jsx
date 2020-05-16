import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Divider, IconButton, TextField, Typography} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import {localforage as lf} from '../../localforage';

import LfForm from './LfForm';
import {MUIIcon, MUITable} from '../../components/components';
import {JsonViewer} from './JsonViewer';
import {LIST_KEY, PLAYLIST_TYPE} from '../../constants';
import {getTableActions, isValidIndex, moveDown, moveUp} from '../../functions';
import {useDB} from '../../hooks/customHooks';
import {JsonImport} from './JsonImport';

export const LfPlaylist = ({lists, setLists, edited, setEdited}) => {
    const [content, setContent] = useState([]);
    const [title, setTitle] = useState('');
    const [track, setTrack] = useState('');
    const [playlistKey, setPlaylistKey] = useState(null);
    const [showJson, setShowJson] = useState(false);
    const [importJson, setImportJson] = useState(false);

    const [, {getDbContent}] = useDB();

    useEffect(() => {
        const currentKey = edited['href'];
        if (currentKey) {
            getDbContent(currentKey, setContent);
        }
        setTitle(edited['title']);
        setPlaylistKey(currentKey);
    }, [edited, getDbContent]);

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
    };

    const onSave = () => {
        const playlistKey = edited['href'];
        lf.setItem(playlistKey, [...content]).then().catch();
        onSaveTitle(title);
        setEdited(null);
    };

    const onExportToJson = () => {
        setShowJson(true);
    };

    const addPlaylist = (data, key, title) => {
        const element = {key, title, href: key, type: PLAYLIST_TYPE.LF};
        lf.setItem(LIST_KEY, [...data.filter(el => el.type === PLAYLIST_TYPE.LF), element]).then(() => {
                setPlaylistKey(key);
                setLists([...data, element]);
            }
        );
    };

    const renamePlaylist = (el, data, key, title) => {
        el['title'] = title;
        lf.setItem(LIST_KEY, [...data.filter(el => el.type === PLAYLIST_TYPE.LF)]).then(() => {
            setLists([...data]);
        });
    };

    const onSaveTitle = (title) => {
        const el = lists.find(el => el.href === playlistKey);
        if (el) {
            renamePlaylist(el, lists, playlistKey, title);
        } else {
            addPlaylist(lists, playlistKey, title);
        }
    };

    const onImportToJson = () => {
        setImportJson(true);
    };

    const onUp = (ind) => {
        setContent(moveUp(content, ind));
    };

    const onDown = (ind) => {
        setContent(moveDown(content, ind));
    };

    return (
        <>
            {showJson && <JsonViewer content={content} setShowJson={setShowJson} title={title}/>}
            {importJson &&
            <JsonImport content={content} setContent={setContent} setImportJson={setImportJson} title={title}/>}

            {(!showJson && !importJson) &&
            <>
                <TextField variant='outlined' name='title'
                           value={title} onChange={(evt) => setTitle(evt.target.value)}
                           margin='dense' id='title' label='Название плейлиста' type='text' fullWidth/>
                <IconButton onClick={onCreateTrack} title={'добавить трек'}><Add color={'primary'}/></IconButton>
                <IconButton onClick={onExportToJson} title={'вывести в формате JSON'}>
                    <MUIIcon icon={'ToJson'} color={'primary'}/>
                </IconButton>
                <IconButton onClick={onImportToJson} title={'загрузить из файла JSON'}>
                    <MUIIcon icon={'FromJson'} color={'primary'}/>
                </IconButton>
                <MUITable data={content} size={'small'} TracksLimit={5} columns={['title', 'link']}
                          tableTitle={'Содержимое плейлиста "' + title + '"'}
                          hoverField={'title'} actions={getTableActions(onDeleteTrack, onEditTrack, null, onUp, onDown)}/>

                {track && <LfForm track={track} setTrack={setTrack} onSaveTrack={onSaveTrack}/>}

                <ButtonGroup style={{marginTop: '10px', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <Button onClick={onCancel} title='вернуться к списку без сохранения текущего плейлиста'>
                        назад к списку плейлистов
                    </Button>
                    <Button onClick={onSave} title='сохрвнмть м вернуться к списку' color={'primary'}
                            variant={'contained'}>
                        !!! сохранить текущий плейлист !!!
                    </Button>
                </ButtonGroup>

                <Divider style={{margin: '10px 0'}}/>
                <Typography variant={'caption'}>
                    После изменения состава плейлиста, нужно воспользоваться кнопкой
                    "Сохранить текущий плейлист" для сохранения списка в IndexedDB
                </Typography>
            </>
            }
        </>
    );
};