import React from 'react';

import './Player.css';

const Player = ({data, playerActive}) => {
    const enablePlayer = playerActive && data && data.length > 0;
    const ids = data.map(item => item['link']);
    const [first, ...rest] = ids;
    const youtubeList = rest.length > 0 ? rest.join(',') : '';

    const youSrc = 'https://www.youtube.com/embed/' + first + '?playlist=' + youtubeList;
    return (
        <>
            {enablePlayer ?
                <iframe className='w-100 iframe' src={youSrc} title={first} id={first}></iframe> :
                null
            }
        </>
    );
};

export default Player;