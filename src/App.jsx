import React, {useState} from 'react';

import {ThemeProvider} from '@material-ui/styles';
import {Container, CssBaseline, Paper, Typography} from '@material-ui/core';

import PlayListContainer from './components/PlayListContainer';
import Player from './components/player/Player';

import {getLocalPlaylists} from './functions';
import {theme} from './theme';
import {useStyles} from './App.css.js';
import Aside from './components/aside/Aside';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import FormDialog from './components/form/FormDialog';

const App = () => {
    const [lists, setLists] = useState(getLocalPlaylists());
    const [playlist, setPlaylist] = useState(null);
    const [content, setContent] = useState([]);
    const [playerActive, setPlayerActive] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
                </Paper>

                <Footer classes={classes} setIsDrawerOpen={setIsDrawerOpen}
                        setIsFormOpen={setIsFormOpen}/>

                <FormDialog isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} lists={lists} setLists={setLists}/>
            </Container>
        </ThemeProvider>
    );
};

export default App;
