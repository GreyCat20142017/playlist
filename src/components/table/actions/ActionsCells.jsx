import React from 'react';
import {Button, TableCell} from '@material-ui/core';
import {MUIIcon} from '../../components';

const ActionsCells = ({actions, rowInd, disabledCondition = false, disabledActions = ['edit', 'delete']}) => {
    const onButtonClick = (actions, key, rowInd) => {
        if (actions[key]['onCallback']) {
            actions[key].onCallback(rowInd);
        }
    };

    return (
        Object.keys(actions).map(key => (
            <TableCell size={'small'} key={rowInd + '-' + key} title={actions[key]['title']} style={{width: '20px'}}>
                {(disabledCondition && (disabledActions.indexOf(key.toLowerCase()) !== -1)) ?
                <Button disabled={true} title={actions[key]['title']}>
                    <MUIIcon icon={actions[key]['icon']} color={'disabled'}/>
                </Button>
                :
                <Button  title={actions[key]['title']} onClick={() => onButtonClick(actions, key, rowInd)}>
                    {actions[key]['icon'] ?
                        <MUIIcon icon={actions[key]['icon']}/> :
                        actions[key]['title'] || ''
                    }
                </Button>
                }
            </TableCell>
        )));
};

export default ActionsCells;