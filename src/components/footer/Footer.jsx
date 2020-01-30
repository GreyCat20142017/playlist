import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import {AppBar, Fab, Toolbar, Typography} from '@material-ui/core';
import {MUIIcon} from '../icon/MUIIcon';
import {MARGINAUTO, MARGINRIGHT} from '../../constants';

export const Footer = ({classes, setIsDrawerOpen}) => (
    <AppBar position='static'>
        <Toolbar className={classes.spaceBetween}>
            <div className={classNames(classes.paperFlexFull, classes.fabParent)}>
                <Link to={'/'}>
                    <Fab color='primary' aria-label='home' size='small'
                         title='На главную'>
                        <MUIIcon icon={'Home'}/>
                    </Fab>
                </Link>
                <Fab color='primary' aria-label='playlist content' size='small'
                     onClick={() => setIsDrawerOpen(true)}
                     title='Просмотр содержимого плейлиста (список)'>
                    <MUIIcon icon={'List'}/>
                </Fab>
                <Link to={'/playlists'}>
                    <Fab color='primary' aria-label='add playlist' size='small' style={MARGINRIGHT}
                         title='Редактирование списков плейлистов'>
                        <MUIIcon icon={'PlaylistAdd'}/>
                    </Fab>
                </Link>

            </div>
            <Typography style={MARGINAUTO} variant={'body2'}>2019</Typography>
            <Link to={'/about'}>
                <Fab color='primary' aria-label='add playlist' size='small' style={MARGINRIGHT}
                     title='О программе'>
                    <MUIIcon icon={'Help'}/>
                </Fab>
            </Link>
    </Toolbar>
    </AppBar>
);
