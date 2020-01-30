import React from 'react';
import {Drawer, Fab, Typography} from '@material-ui/core';

import {PlayList, MUIIcon} from '../components';
import {isData} from '../../functions';
import {useStyles} from './Aside.css';

export const Aside = ({data = [], isDrawerOpen = false, onClose, playlist = null, playerActive = false}) => {
    const classes = useStyles();

    return (
        <Drawer className={classes.drawer} open={isDrawerOpen} onClose={onClose}>
            {playlist && isData(data) ?
                <PlayList title={playlist.title} data={data} playerActive={playerActive}/> :
                <Typography className={classes.title} variant={'h6'}>Нет активного плейлиста</Typography>
            }
            <Fab className={classes.fabCenter} size={'small'} color='primary' onClick={onClose}>
                <MUIIcon icon={'Close'}/>
            </Fab>
        </Drawer>
    );
};