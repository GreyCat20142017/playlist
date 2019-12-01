import React from 'react';
import * as PropTypes from 'prop-types';

import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';

import Submenu from '../submenu/Submenu';
import MUIIcon from '../icon/MUIIcon';
import {getPlaylists} from '../../functions';
import {MARGINLEFT} from '../../constants';

const Header = ({classes, lists = [], callback, playlist, playerActive, switchPlayerActive}) => (
    <AppBar position='static'>
        <Toolbar className={classes.spaceBetween}>
            <div className={classes.paperFlexFull}>
                <Submenu submenuItems={getPlaylists(lists)} withNavLink={false} callback={callback}
                         switchIcon={'Playlist'}/>
                <Typography className={classes.ml} variant={playlist ? 'h6' : 'caption'}>
                    {playlist ? playlist.title : 'плейлист не выбран'}
                </Typography>
                {playlist ?
                    <IconButton onClick={switchPlayerActive} color='inherit'
                                title={playerActive ? 'выключить плеер' : 'включить плеер'}>
                        <MUIIcon icon={playerActive ? 'Off' : 'On'} size={'large'}/>
                    </IconButton>
                    : null
                }
                <Typography style={MARGINLEFT} variant='h6'>playlist</Typography>
                <MUIIcon icon={'Paw'} size={'large'}/>
            </div>
        </Toolbar>
    </AppBar>
);

Header.propTypes = {
    classes: PropTypes.object,
    lists: PropTypes.arrayOf(PropTypes.object),
    callback: PropTypes.func,
    playlist: PropTypes.object || null,
    onClick: PropTypes.func,
    playerActive: PropTypes.bool
};

export default Header;