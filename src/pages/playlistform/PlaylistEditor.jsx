import React from 'react';
import {PLAYLIST_TYPE} from '../../constants';
import LsPlaylist from './LsPlaylist';
import {LfPlaylist} from './LfPlaylist';

const PlaylistSwitcher = ({edited, setEdited, lists, setLists}) => (
    <>
        {edited && edited.type === PLAYLIST_TYPE.LF &&
        <LfPlaylist lists={lists} setLists={setLists} edited={edited} setEdited={setEdited}/>}
        {edited && edited.type === PLAYLIST_TYPE.JSON &&
        <LsPlaylist lists={lists} setLists={setLists} edited={edited} setEdited={setEdited}/>
        }
    </>
);

export default PlaylistSwitcher;