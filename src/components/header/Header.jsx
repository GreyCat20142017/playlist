import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {AppBar, Fab, Hidden, Toolbar, Typography} from '@material-ui/core';

import {Submenu, MUIIcon} from '../components';
import {getPlaylists} from '../../functions';
import {MARGINAUTO} from '../../constants';
import {ROUTES} from '../../routes';

export const Header = ({classes, lists = [], callback, playlist, playerActive, switchPlayerActive}) => (
    <AppBar position='static'>
        <Toolbar className={classes.spaceBetween}>
            <div className={classNames(classes.paperFlexFull, classes.fabParent)}>

                <Submenu submenuItems={getPlaylists(lists)} withNavLink={false} callback={callback}
                         switchIcon={'SelectList'} prompt={'Выбор из списка плейлистов'}/>
                <Typography className={classes.ml}>
                    {playlist ? playlist.title : 'плейлист не выбран'}
                </Typography>
                {playlist ?
                    <Fab color='primary' aria-label='playlist content' size='small'
                         onClick={switchPlayerActive} title={playerActive ? 'выключить плеер' : 'включить плеер'}>
                        <MUIIcon icon={playerActive ? 'Off' : 'On'} size={'large'}/>
                    </Fab>
                    : null
                }

                <Link className={classNames(classes.link, classes.paperFlex)}
                      to={ROUTES.MAIN} style={MARGINAUTO} title={'На главную'}>
                    <Hidden xsDown>
                        <Typography style={{marginRight: '7px'}} variant='h6'>playlist</Typography>
                    </Hidden>
                    <MUIIcon icon={'Paw'} size={'large'}/>
                </Link>
            </div>
        </Toolbar>
    </AppBar>
);

