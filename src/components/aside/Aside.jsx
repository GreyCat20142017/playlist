import React from 'react';
import * as PropTypes from 'prop-types';

import {Drawer, Fab, Typography} from '@material-ui/core';

import MUIIcon from '../icon/MUIIcon';
import PlayList from '../PlayList';
import {isData} from '../../functions';

const Aside = (props) => (
    <Drawer className={props.classes.drawer} open={props.open} onClose={props.onClose}>
        {props.playlist && isData(props.data) ?
            <PlayList title={props.playlist.title} data={props.data} playerActive={props.playerActive}/> :
            <Typography variant={'h5'}>Нет активного плейлиста</Typography>
        }
        <Fab className={props.classes.fabCenter} size={'small'} color='primary' onClick={props.onClose}>
            <MUIIcon icon={'Close'}/>
        </Fab>
    </Drawer>
);

Aside.propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    playlist: PropTypes.object||null,
    data: PropTypes.arrayOf(PropTypes.object),
    playerActive: PropTypes.bool
};

export default Aside;