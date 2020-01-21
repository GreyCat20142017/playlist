import React from 'react';
import * as PropTypes from 'prop-types';
import {Button, TableCell} from '@material-ui/core';
import MUIIcon from '../../icon/MUIIcon';

const ActionsCells = ({actions, rowInd, disabledCondition = false, disabledActions = ['edit', 'delete']}) => {
    const onButtonClick = (actions, key, rowInd) => {
        if (actions[key]['onCallback']) {
            actions[key].onCallback(rowInd);
        }
    };

    return (
        Object.keys(actions).map(key => (
            <TableCell key={rowInd + '-' + key} title={actions[key]['title']}>
                {(disabledCondition && (disabledActions.indexOf(key.toLowerCase()) !== -1)) ?
                <Button disabled={true}>
                    <MUIIcon icon={actions[key]['icon']} color={'disabled'}/>
                </Button>
                :
                <Button onClick={() => onButtonClick(actions, key, rowInd)}>
                    {actions[key]['icon'] ?
                        <MUIIcon icon={actions[key]['icon']}/> :
                        actions[key]['title'] || ''
                    }
                </Button>
                }
            </TableCell>
        )));
};

ActionsCells.propTypes = {
    actions: PropTypes.object,
    rowInd: PropTypes.number
};

export default ActionsCells;