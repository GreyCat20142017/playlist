import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {getClearData, getFilteredData} from '../../functions';
import {PLAYLIST_TYPE} from '../../constants';
import {localforage as lf} from '../../localforage';

export const PlayListContainer = ({playlist, setContent}) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async (playlist) => {
            const res = await axios.get(playlist['href']);
            try {
                setContent(res ? getClearData(getFilteredData(res.data)) : []);
            } catch (err) {
                setError(err.message);
            }
        };

        const getLfData = async (playlist) => {
            const currentKey = playlist['href'];
            if (currentKey) {
                lf.getItem(currentKey).then(el => {
                    if (el && Array.isArray(el)) {
                        setContent([...el]);
                    }
                }).catch(err => setError(err.message));
            }
        };

        if (playlist) {
            (playlist.type === PLAYLIST_TYPE.LF) ? getLfData(playlist) : getData(playlist);
        }

    }, [playlist, setContent]);

    return (
        <>
            <p className='text-warning'>{error}</p>
        </>
    );
};
