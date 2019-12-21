import React, {useState} from 'react';

import {ThemeProvider} from '@material-ui/styles';
import {Container, CssBaseline, Paper, Typography} from '@material-ui/core';

import PlayListContainer from './components/PlayListContainer';
import Player from './components/player/Player';
import Aside from './components/aside/Aside';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import FormDialog from './components/form/FormDialog';
import PlayerStepper from './components/stepper/PlayerStepper';
import {getActiveStep, getLocalPlaylists, getPlaylists} from './functions';

import {theme} from './theme';
import {useStyles} from './App.css.js';
import Comment from './components/comment/Comment';
import Submenu from './components/submenu/Submenu';

const App = () => {
    const [lists, setLists] = useState(getLocalPlaylists());
    const [playlist, setPlaylist] = useState(null);
    const [content, setContent] = useState([]);
    const [playerActive, setPlayerActive] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isStepperSubmenu, setIsStepperSubmenu] = useState(null);
    const classes = useStyles();

    const changePlaylist = (key) => {
        const ind = parseInt(key);
        if (lists.length > ind) {
            setPlaylist(lists[ind]);
        }
    };

    const switchPlayerActive = () => setPlayerActive(!playerActive);

    return (

        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container className={classes.app}>

                <Header classes={classes} lists={lists} callback={changePlaylist} playlist={playlist}
                        switchPlayerActive={switchPlayerActive} playerActive={playerActive}/>

                <Paper className={classes.paperWhite}>
                    <Typography className='' variant='h5'>Анонимный проигрыватель youtube-видео</Typography>
                    <PlayListContainer playlist={playlist} playerActive={playerActive} content={content}
                                       setContent={setContent}/>
                    <Aside classes={classes} isDrawerOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}
                           playlist={playlist} data={content} playerActive={playerActive}/>
                    <Player data={content} playerActive={playerActive}/>
                    {playlist && playerActive ?
                        <Comment setPlayerActive={setPlayerActive}/> :
                        <PlayerStepper activeStep={getActiveStep(playlist, playerActive)}
                                       playlist={playlist} setPlaylist={setPlaylist} changePlaylist={changePlaylist}
                                       playerActive={playerActive} setPlayerActive={setPlayerActive}
                                       showSubmenu={setIsStepperSubmenu}
                        />
                    }

                    <Submenu submenuItems={getPlaylists(lists)} withNavLink={false} callback={changePlaylist}
                             switchIcon={'SelectList'} prompt={'Выбор из списка плейлистов'}
                             anchor={isStepperSubmenu} showButton={false} showSubmenu={setIsStepperSubmenu}/>
                </Paper>

                <Footer classes={classes} setIsDrawerOpen={setIsDrawerOpen}
                        setIsFormOpen={setIsFormOpen}/>

                <FormDialog isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} lists={lists} setLists={setLists}/>
            </Container>
        </ThemeProvider>
    );
};

export default App;
