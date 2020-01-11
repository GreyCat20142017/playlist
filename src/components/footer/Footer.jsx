import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import {AppBar, Fab, Toolbar, Typography} from '@material-ui/core';
import MUIIcon from '../icon/MUIIcon';
import {MARGINAUTO, MARGINRIGHT} from '../../constants';

const Footer = ({classes, setIsDrawerOpen, setIsFormOpen, setIsLfOpen}) => (
    <AppBar position='static'>
        <Toolbar className={classes.spaceBetween}>
            <div className={classNames(classes.paperFlexFull, classes.fabParent)}>
                <Fab color='primary' aria-label='playlist content' size='small'
                     onClick={() => setIsDrawerOpen(true)}
                            title='Просмотр содержимого плейлиста (список)'>
                    <MUIIcon icon={'List'}/>
                </Fab>
                <Fab color='primary' aria-label='add playlist' size='small' style={MARGINRIGHT}
                     onClick={() => setIsFormOpen(true)}
                            title='Добавление нового плейлиста (на основе Json)'>
                    <MUIIcon icon={'PlaylistAdd'}/>
                </Fab>
                <Fab color='primary' aria-label='add playlist' size='small' style={MARGINRIGHT}
                     onClick={() => setIsLfOpen(true)}
                            title='Изменение локальных плейлистов'>
                    <MUIIcon icon={'ListAlt'}/>
                </Fab>
                <Typography style={MARGINAUTO} variant={'body2'}>2019</Typography>
            </div>
        </Toolbar>
    </AppBar>
);

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
    setIsDrawerOpen: PropTypes.func.isRequired,
    setIsFormOpen: PropTypes.func.isRequired
};

export default Footer;