import React, {useState, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {Fab, Menu, MenuItem} from '@material-ui/core';

import MUIIcon from '../icon/MUIIcon';
import {useStyles} from '../../App.css';

const Submenu = ({
                     submenuItems = [], callback = null,
                     switchIcon = 'More', text = '', prompt = 'выбор', anchor = null, showButton = true, showSubmenu = null
                 }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        setAnchorEl(anchor);
    }, [anchor]);

    const convertedItems = submenuItems.map(item => (typeof (item) === 'object' ? item : ({
        'href': item,
        'text': item,
        'key': item
    })));

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (key) => {
        setAnchorEl(null);
        if (showSubmenu) {
            showSubmenu(null);
        }
        if (callback) {
            callback(key);
        }
    };

    return (
        <>
            {showButton ?
                <Fab color='primary' size='small' title={prompt}
                     aria-controls='submenu' aria-haspopup='true' onClick={handleClick}
                     disabled={submenuItems.length === 0}>
                    <MUIIcon icon={switchIcon}/>
                </Fab> : null
            }
            <Menu className={classes.submenu}
                  id='submenu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
            >
                {convertedItems.map((link, ind) =>
                    (
                        <MenuItem key={ind} title={link.text} onClick={() => handleClose(link.key)}>
                            <MUIIcon icon={link.icon}/>
                            <span>&nbsp;</span>
                            <span>{link.text}</span>
                        </MenuItem>
                    ))}

            </Menu>
        </>
    );
};

Submenu.propTypes = {
    submenuItems: PropTypes.array,
    callback: PropTypes.func,
    switchIcon: PropTypes.string,
    text: PropTypes.string,
    prompt: PropTypes.string,
    anchor: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
    showButton: PropTypes.bool,
    showSubmenu: PropTypes.func
};

export default Submenu;