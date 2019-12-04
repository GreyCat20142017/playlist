import React from 'react';
import MUIIcon from '../../icon/MUIIcon';
import {Button, TableCell} from '@material-ui/core';

const ActionsCells = ({actions, rowInd}) => {
    const onButtonClick = (actions, key, rowInd) => {
        if (actions[key]['onCallback']) {

            actions[key].onCallback(rowInd);
        }
    };

    return (
        actions ? Object.keys(actions).map(key => (
            <TableCell key={rowInd + '-' + key} title={actions[key]['title']}>
                <Button onClick={() => onButtonClick(actions, key, rowInd)}>
                    {actions[key]['icon'] ?
                        <MUIIcon icon={actions[key]['icon']}/> :
                        actions[key]['title'] || ''
                    }
                </Button>
            </TableCell>
        )) : null
    );
};

export default ActionsCells;