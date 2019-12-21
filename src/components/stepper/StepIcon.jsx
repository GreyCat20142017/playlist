import {useStepperStyles} from './PlayerStepper.css';
import {isValidIndex} from '../../functions';
import {PLAYER_STEPS_ICONS} from '../../constants';
import clsx from 'clsx';
import MUIIcon from '../icon/MUIIcon';
import React from 'react';

const StepIcon = ({active = false, completed = false, error = false, icon = 'PlayList'}) => {
    const classes = useStepperStyles();
    const stepIcon = isValidIndex(icon - 1, PLAYER_STEPS_ICONS) ?
        PLAYER_STEPS_ICONS[icon - 1] :
        icon;
    return (
        <div
            className={clsx(classes.rootStep, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}>
            <MUIIcon icon={active || !completed ? stepIcon : 'Done'}/>
        </div>
    );
};

export default StepIcon;