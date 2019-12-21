import React from 'react';
import * as PropTypes from 'prop-types';

import {Drawer, Fab, Typography} from '@material-ui/core';

import MUIIcon from '../icon/MUIIcon';
import PlayList from '../PlayList';
import {isData} from '../../functions';
import {makeStyles} from '@material-ui/core/styles';
import {theme} from '../../theme';

const useStyles = makeStyles({
    drawer: {
        width: '320px',
        padding: theme.spacing(1),
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    fabCenter: {
        margin: '20px auto 0'
    }
});

const Aside = ({data = [], isDrawerOpen = false, onClose, playlist = null, playerActive = false}) => {
    const classes = useStyles();

    return (<Drawer className={classes.drawer} open={isDrawerOpen} onClose={onClose}>
            {playlist && isData(data) ?
                <PlayList title={playlist.title} data={data} playerActive={playerActive}/> :
                <Typography variant={'h5'}>Нет активного плейлиста</Typography>
            }
            <Fab className={classes.fabCenter} size={'small'} color='primary' onClick={onClose}>
                <MUIIcon icon={'Close'}/>
            </Fab>
        </Drawer>
    );
};

Aside.propTypes = {
    classes: PropTypes.object,
    isDrawerOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    playlist: PropTypes.object || null,
    data: PropTypes.arrayOf(PropTypes.object),
    playerActive: PropTypes.bool
};

export default Aside;