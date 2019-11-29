import React, {useState} from 'react';
import PlayListContainer from './components/PlayListContainer';
import {PLAYLISTS} from './constants';
import DropDown from './components/dropdown/DropDownHook';
import {getPlaylists} from './functions';

const App = () => {
    const [playlist, setPlaylist] = useState(null);
    const [playerActive, setPlayerActive] = useState(false);

    const changePlaylist = (key) => {
        if (PLAYLISTS.length > key) {
            setPlaylist(PLAYLISTS[key]);
        }
    };

    const switchPlayerActive = (playerAvtive) => setPlayerActive(!playerActive);

    return (
        <div className='container mx-auto text-center pt-3'>
            <h1 className='h4-responsive'>Анонимный проигрыватель youtube-видео</h1>
            <hr/>
            <DropDown data={getPlaylists()}
                      ariaInfo={'operation-dropdown'}
                      togglerText={playlist ? playlist['title'] : 'выбор плейлиста...'} callback={changePlaylist}
                   />
            {playlist ?
                <button className='btn btn-sm'
                        onClick={switchPlayerActive}>{playerActive ? 'выключить плеер' : 'включить плеер'}</button> :
                null
            }
            <hr/>
            <PlayListContainer playlist={playlist} playerActive={playerActive}/>
        </div>
    );
};

export default App;
