import {AppBar, IconButton, Toolbar} from '@material-ui/core';
import MUIIcon from '../icon/MUIIcon';
import {MARGINLEFT} from '../../constants';
import * as PropTypes from 'prop-types';
import React from 'react';

const Footer = ({classes, setIsDrawerOpen, setIsFormOpen}) => (
    <AppBar position='static'>
        <Toolbar className={classes.spaceBetween}>
            <div className={classes.paperFlexFull}>
                <IconButton edge='start' color='inherit' aria-label='menu'
                            onClick={() => setIsDrawerOpen(true)}
                            title='Просмотр содержимого плейлиста (список)'>
                    <MUIIcon icon={'List'}/>
                </IconButton>
                <IconButton edge='start' color='inherit' aria-label='add playlist'
                            onClick={() => setIsFormOpen(true)}
                            title='Добавление нового плейлиста'>
                    <MUIIcon icon={'PlaylistAdd'}/>
                </IconButton>
                <IconButton style={MARGINLEFT} color='inherit' aria-label='help'
                            title='Подсказка'>
                    <MUIIcon icon={'Help'}/>
                </IconButton>
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