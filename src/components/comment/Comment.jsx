import React from 'react';
import * as PropTypes from 'prop-types';
import {Fab, Typography, Divider} from '@material-ui/core';
import MUIIcon from '../icon/MUIIcon';

const Comment = ({setPlayerActive}) => (
    <>
        <Typography variant='body2' color='primary'>
            Выбранный плейлист теперь доступен в стандартном iframe youtube
        </Typography>
        <Divider/>
        <Typography variant='caption' color='primary'>
            отключить плеер: <Fab size='small' color='primary' onClick={() => setPlayerActive(false)}><MUIIcon
            icon='Off'/></Fab>
        </Typography>

    </>
);

Comment.propTypes = {
    setPlayerActive: PropTypes.func.isRequired
};
export default Comment;