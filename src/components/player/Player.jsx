import React from 'react';

import {useStyles} from './Player.css.js';
import {YOUTUBE_EMBED} from '../../constants';
import {isData} from '../../functions';

export const Player = ({data = null, playerActive = false}) => {
    const classes = useStyles();
    const enablePlayer = playerActive && isData(data);
    const ids = data.map(item => item['link']);
    const [first, ...rest] = ids;
    const youtubeList = rest.length > 0 ? rest.join(',') : '';

    const youSrc = YOUTUBE_EMBED + first + '?playlist=' + youtubeList;
    return (
        <>
            {enablePlayer ?
                <iframe className={classes.iframe} src={youSrc} title={first} id={first}></iframe> :
                null
            }
        </>
    );
};
