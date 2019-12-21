import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import {getClearData, getFilteredData} from '../functions';

const PlayListContainer = ({playlist, setContent}) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async (playlist) => {
            const res = await axios.get(playlist.href);
            try {
                setContent(res ? getClearData(getFilteredData(res.data)) : []);
            } catch (err) {
                setError(err.message);
            }
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

PlayListContainer.propTypes = {
    playlist: PropTypes.object,
    setContent: PropTypes.func.isRequired
}

export default PlayListContainer;

