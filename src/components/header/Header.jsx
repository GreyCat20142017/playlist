import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {AppBar, Fab, Toolbar, Typography} from '@material-ui/core';

import {Submenu, MUIIcon} from '../components';
import {getPlaylists} from '../../functions';
import {MARGINAUTO} from '../../constants';

export const Header = ({classes, lists = [], callback, playlist, playerActive, switchPlayerActive}) => (
    <AppBar position='static'>
        <Toolbar className={classes.spaceBetween}>
            <div className={classNames(classes.paperFlexFull, classes.fabParent)}>

                <Submenu submenuItems={getPlaylists(lists)} withNavLink={false} callback={callback}
                         switchIcon={'SelectList'} prompt={'Выбор из списка плейлистов'}/>
                <Typography className={classes.ml} variant={playlist ? 'h6' : 'caption'}>
                    {playlist ? playlist.title : 'плейлист не выбран'}
                </Typography>
                {playlist ?
                    <Fab color='primary' aria-label='playlist content' size='small'
                         onClick={switchPlayerActive} title={playerActive ? 'выключить плеер' : 'включить плеер'}>
                        <MUIIcon icon={playerActive ? 'Off' : 'On'} size={'large'}/>
                    </Fab>
                    : null
                }

                <Link className={classNames(classes.link, classes.paperFlex)} to='/' style={MARGINAUTO}>
                    <Typography style={{marginRight: '7px'}} variant='h6'>playlist</Typography>
                    <MUIIcon icon={'Paw'} size={'large'}/>
                </Link>
            </div>
        </Toolbar>
    </AppBar>
);

