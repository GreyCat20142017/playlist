import React from 'react';
import * as PropTypes from 'prop-types';
import {TableCell} from '@material-ui/core';

const ActionsHeaders = ({actions}) => (
    actions ? Object.keys(actions).map(key => (
        <TableCell key={'action-' + key}></TableCell>
    )) : null
);

ActionsHeaders.propTypes = {
    actions: PropTypes.object
};

export default ActionsHeaders;