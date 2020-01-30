import React from 'react';
import {TableCell} from '@material-ui/core';

const ActionsHeaders = ({actions}) => (
    actions ? Object.keys(actions).map(key => (
        <TableCell style={{width: '20px'}} key={'action-' + key}></TableCell>
    )) : null
);

export default ActionsHeaders;