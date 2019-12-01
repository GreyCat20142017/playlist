import React from 'react';
import {Button, Menu, MenuItem} from '@material-ui/core';

import MUIIcon from '../icon/MUIIcon';
import {useStyles} from '../../App.css';

const Submenu = ({
                     submenuItems = [], callback = null,
                     switchIcon = 'More', text = ''
                 }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

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
        if (callback) {
            callback(key);
        }
    };

    return (
        <>
            <Button color={'inherit'}
                    aria-controls='submenu' aria-haspopup='true' onClick={handleClick}
                    disabled={submenuItems.length === 0}>
                <MUIIcon icon={switchIcon}/>

            </Button>
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

export default Submenu;