import React, {useEffect, useState} from 'react';
import axios from 'axios';

import PlayList from './PlayList';
import Player from './player/Player';
import {extractYoutubeId} from '../functions';

const getClearData = (data) => data.map(el => {
    el['link'] = el['link'] ? extractYoutubeId(el['link']) : '';
    return el;
});

const isData = (data) => (data && data.length > 0);

const PlayListContainer = ({playlist, playerActive}) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = (playlist) => {
            axios.get(playlist.href)
                .then(res => setData(getClearData(res.data)))
                .catch(err => setError(err.message));
        };

        if (playlist) {
            getData(playlist);
        }

    }, [playlist, setData]);

    return (
        <>
            {playerActive && isData(data) ? <Player data={data} playerActive={playerActive}/> : null}
            {playlist && isData(data) ?
                <PlayList title={playlist.title} data={data} playerActive={playerActive}/> :
                <p><strong>tНет активного плейлиста</strong></p>
            }
            <p className='text-warning'>{error}</p>
        </>
    );
};

export default PlayListContainer;

