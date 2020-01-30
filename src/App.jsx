import React, {useEffect, useState} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import {ThemeProvider} from '@material-ui/styles';
import {Container, CssBaseline, Paper, Typography} from '@material-ui/core';
import {
    About,
    Aside,
    Comment,
    Footer,
    Header,
    Player,
    PlayerStepper,
    PlayListContainer,
    PlaylistDialog,
    Submenu
} from './components/components';
import LastPageContext from './LastPageContext';
import {getActiveStep, getLocalPlaylists, getPlaylists} from './functions';
import {useDB} from './hooks/customHooks';
import {theme} from './theme';
import {useStyles} from './App.css.js';

const AppMain = ({content, playerActive, setPlayerActive, playlist, setPlaylist, changePlaylist, setIsStepperSubmenu}) => (
    <>
        <Player data={content} playerActive={playerActive}/>
        {playlist && playerActive ?
            <Comment setPlayerActive={setPlayerActive}/> :
            <PlayerStepper activeStep={getActiveStep(playlist, playerActive)}
                           playlist={playlist} setPlaylist={setPlaylist} changePlaylist={changePlaylist}
                           playerActive={playerActive} setPlayerActive={setPlayerActive}
                           showSubmenu={setIsStepperSubmenu}/>
        }
    </>
);

const App = ({history}) => {
    const [lists, setLists] = useState([]);
    const [playlist, setPlaylist] = useState(null);
    const [content, setContent] = useState([]);
    const [playerActive, setPlayerActive] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isStepperSubmenu, setIsStepperSubmenu] = useState(null);
    const [lastPage, setLastPage] = useState(0);
    const [lfData] = useDB();

    const classes = useStyles();

    useEffect(() => {
        setLists([...getLocalPlaylists(), ...lfData]);
    }, [lfData]);

    const changePlaylist = (key) => {
        const ind = parseInt(key);
        if (lists.length > ind) {
            setPlaylist(lists[ind]);
            history.push('/');
        }
    };

    const switchPlayerActive = () => setPlayerActive(!playerActive);

    const mainProps = {
        content, playerActive, setPlayerActive, playlist, setPlaylist, changePlaylist, setIsStepperSubmenu
    };
    return (

        <ThemeProvider theme={theme}>
            <LastPageContext.Provider value={{lastPage, setLastPage}}>
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

                        <Switch>
                            <Route path='/' exact render={() => <AppMain {...mainProps}/>}/>
                            <Route path='/playlists'
                                   render={() => <PlaylistDialog lists={lists} setLists={setLists}/>}/>
                            <Route path='/about' render={() => <About/>}/>
                            <Route render={() => <p>404. Страница не найдена</p>}/>
                        </Switch>

                        <Submenu submenuItems={getPlaylists(lists)} withNavLink={false} callback={changePlaylist}
                                 switchIcon={'SelectList'} prompt={'Выбор из списка плейлистов'}
                                 anchor={isStepperSubmenu} showButton={false} showSubmenu={setIsStepperSubmenu}/>
                    </Paper>

                    <Footer classes={classes} setIsDrawerOpen={setIsDrawerOpen}/>

                </Container>
            </LastPageContext.Provider>
        </ThemeProvider>
    );
};

export default withRouter(App);
