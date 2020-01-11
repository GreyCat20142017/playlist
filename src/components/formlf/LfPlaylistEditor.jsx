import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, IconButton} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import {localforage as lf} from '../../localforage';

import LfForm from './LfForm';
import MUITable from '../table/MUITable';
import {getNewKey, getTableActions, isValidIndex} from '../../functions';
import MUIIcon from '../icon/MUIIcon';
import LfNameForm from './LfNameForm';
import {LIST_KEY} from '../../constants';

export const LfPlaylistEditor = ({lfLists, setLfLists, edited, setEdited}) => {
    const [content, setContent] = useState([]);
    const [title, setTitle] = useState('');
    const [track, setTrack] = useState('');
    const [playlistKey, setPlaylistKey] = useState(null);

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

    const onDeleteTrack = () => {

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

    const onCancel = () => setEdited(false);

    const onSave = () => {
        const playlistKey = edited['key'];
        setEdited(false);
        lf.setItem(playlistKey, [...content]).then().catch();
    };

    const onExportToJson = () => {
        const json = JSON.stringify(content);
        console.log(json);
    };

    const onSaveTitle = (title) => {
        if (playlistKey) {

        } else {
            const key = getNewKey();
            const newPlaylist = {key, title};
            lf.getItem(LIST_KEY).then(lfdata => {
                const data = lfdata ? lfdata : [];
                lf.setItem(LIST_KEY, [...data, {key, title}]);
            });
            setLfLists([...lfLists, newPlaylist]);
            setTitle(title);
            setPlaylistKey(key);
            setEdited(newPlaylist);
        }
    };


    return (
        <>

            {playlistKey ?
                <>
                    <IconButton onClick={onCreateTrack} title={'добавить трек'}><Add/></IconButton>
                    <IconButton onClick={onExportToJson} title={'экспорт в JSON'}><MUIIcon
                        icon={'Storage'}/></IconButton>
                    <MUITable data={content} size={'small'} TracksLimit={5} columns={['title', 'link']}
                              tableTitle={'Содержимое плейлиста "' + title + '"'}
                              hoverField={'title'} actions={getTableActions(onDeleteTrack, onEditTrack)}/>
                </>
                :
                <LfNameForm title={title} onSaveTitle={onSaveTitle} change={!!playlistKey}/>
            }
            {track && <LfForm track={track} setTrack={setTrack} onSaveTrack={onSaveTrack}/>}
            <ButtonGroup style={{marginTop: '10px'}}>
                <Button onClick={onCancel} title='вернуться к списку без сохранения текущего плейлиста'>
                    назад к списку плейлистов
                </Button>
                <Button onClick={onSave} title='сохрвнмть м вернуться к списку'>
                    сохранить текущий плейлист
                </Button>
            </ButtonGroup>
        </>
    );
};