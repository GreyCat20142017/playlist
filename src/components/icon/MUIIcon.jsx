import React from 'react';
import {
    Home, Settings, Info, MoreVert as More, HelpOutline as Help, Menu,
    MusicNote as MusicOn, MusicOff, QueueMusic as List, Close, PlaylistPlay, PlaylistAdd, Pets,
    MenuOpen as SelectList, Delete, Edit, PlayArrow, Done, Storage, ListAlt,
    FormatIndentIncrease as ToJson, FormatIndentDecrease as FromJson
} from '@material-ui/icons';


export const MUIIcon = ({icon = '', iconSize = 'small', color = 'inherit'}) => {
    switch (icon) {
        case 'Menu':
            return <Menu fontSize={iconSize} color={color}/>;
        case 'Home':
            return <Home fontSize={iconSize} color={color}/>;
        case 'Settings':
            return <Settings fontSize={iconSize} color={color}/>;
        case 'Info':
            return <Info fontSize={iconSize} color={color}/>;
        case 'More':
            return <More fontSize={iconSize} color={color}/>;
        case 'Help':
            return <Help fontSize={iconSize} color={color}/>;
        case 'On':
            return <MusicOn fontSize={iconSize} color={color}/>;
        case 'Off':
            return <MusicOff fontSize={iconSize} color={color}/>;
        case 'Playlist':
            return <PlaylistPlay fontSize={iconSize} color={color}/>;
        case 'PlaylistAdd':
            return <PlaylistAdd fontSize={iconSize} color={color}/>;
        case 'List':
            return <List fontSize={iconSize} color={color}/>;
        case 'Close':
            return <Close fontSize={iconSize} color={color}/>;
        case 'Paw':
            return <Pets fontSize={iconSize} color={color}/>;
        case 'SelectList':
            return <SelectList fontSize={iconSize} color={color}/>;
        case 'Delete':
            return <Delete fontSize={iconSize} color={color}/>;
        case 'Edit':
            return <Edit fontSize={iconSize} color={color}/>;
        case 'Play':
            return <PlayArrow fontSize={iconSize} color={color}/>;
        case 'Done':
            return <Done fontSize={iconSize} color={color}/>;
        case 'Storage':
            return <Storage fontSize={iconSize} color={color}/>;
        case 'ListAlt':
            return <ListAlt fontSize={iconSize} color={color}/>;
        case 'FromJson':
            return <FromJson fontSize={iconSize} color={color}/>;
        case 'ToJson':
            return <ToJson fontSize={iconSize} color={color}/>;
        default:
    }
    return null;
};