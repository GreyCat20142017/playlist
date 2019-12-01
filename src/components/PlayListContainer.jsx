import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {getClearData} from '../functions';

const PlayListContainer = ({playlist, setContent}) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = (playlist) => {
            axios.get(playlist.href)
                .then(res => setContent(getClearData(res.data)))
                .catch(err => setError(err.message));
        };

        if (playlist) {
            getData(playlist);
        }

    }, [playlist, setContent]);

    return (
        <>
            <p className='text-warning'>{error}</p>
        </>
    );
};

export default PlayListContainer;

