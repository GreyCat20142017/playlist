import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import {AppBar, Fab, Toolbar} from '@material-ui/core';
import MUIIcon from '../icon/MUIIcon';
import {MARGINLEFT} from '../../constants';

const Footer = ({classes, setIsDrawerOpen, setIsFormOpen}) => (
    <AppBar position='static'>
        <Toolbar className={classes.spaceBetween}>
            <div className={classNames(classes.paperFlexFull, classes.fabParent)}>
                <Fab color='primary'  aria-label='playlist content' size='small'
                     onClick={() => setIsDrawerOpen(true)}
                            title='Просмотр содержимого плейлиста (список)'>
                    <MUIIcon icon={'List'}/>
                </Fab>
                <Fab  color='primary' aria-label='add playlist' size='small'
                            onClick={() => setIsFormOpen(true)}
                            title='Добавление нового плейлиста'>
                    <MUIIcon icon={'PlaylistAdd'}/>
                </Fab>
                <Fab style={MARGINLEFT} color='primary' aria-label='help' size='small'
                            title='Подсказка'>
                    <MUIIcon icon={'Help'}/>
                </Fab>
            </div>
        </Toolbar>
    </AppBar>
);

Footer.propTypes = {
    classes: PropTypes.object,
    setIsDrawerOpen: PropTypes.func,
    setIsFormOpen: PropTypes.func
};

export default Footer;