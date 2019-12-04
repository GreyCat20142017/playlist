import React from 'react';

import {
    Home, Settings, Search, CloudQueue as Sky, Info, MoreVert as More, HelpOutline as Help, Menu,
    MusicNote as MusicOn, MusicOff, QueueMusic as List, Close, PlaylistPlay, PlaylistAdd, Pets,
    MenuOpen as SelectList, Delete, Edit
} from '@material-ui/icons';


const MUIIcon = ({icon, iconSize = 'small'}) => {
    switch (icon) {
        case 'Menu':
            return <Menu fontSize={iconSize}/>;
        case 'Home':
            return <Home fontSize={iconSize}/>;
        case 'Settings':
            return <Settings fontSize={iconSize}/>;
        case 'Search':
            return <Search fontSize={iconSize}/>;
        case 'Sky':
            return <Sky fontSize={iconSize}/>;
        case 'Info':
            return <Info fontSize={iconSize}/>;
        case 'More':
            return <More fontSize={iconSize}/>;
        case 'Help':
            return <Help fontSize={iconSize}/>;
        case 'On':
            return <MusicOn fontSize={iconSize}/>;
        case 'Off':
            return <MusicOff fontSize={iconSize}/>;
        case 'Playlist':
            return <PlaylistPlay fontSize={iconSize}/>;
        case 'PlaylistAdd':
            return <PlaylistAdd fontSize={iconSize}/>;
        case 'List':
            return <List fontSize={iconSize}/>;
        case 'Close':
            return <Close fontSize={iconSize}/>;
        case 'Paw':
            return <Pets fontSize={iconSize}/>;
        case 'SelectList':
            return <SelectList fontSize={iconSize}/>;
        case 'Delete':
            return <Delete fontSize={iconSize}/>;
        case 'Edit':
            return <Edit fontSize={iconSize}/>;
        default:
    }
    return null;
};

export default MUIIcon;