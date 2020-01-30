import React from 'react';
import {Stepper, Step, StepLabel} from '@material-ui/core';

import StepIcon from './StepIcon';
import {PLAYER_STEPS} from '../../constants';
import {useStepperStyles} from './PlayerStepper.css';

export const PlayerStepper = ({
                           steps = PLAYER_STEPS, activeStep,
                           playlist = null, setPlaylist, setPlayerActive, showSubmenu
                       }) => {

    const classes = useStepperStyles();

    const changeStep = (evt, ind) => {
        if (ind === 0 && playlist) {
            setPlayerActive(false);
            setPlaylist(null);
            showSubmenu(null);
        } else if (ind === 0 && !playlist) {
            showSubmenu(evt.target);
        } else if (ind === 1 && playlist) {
            setPlayerActive(true);
        }
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step, ind) => (
                    <Step key={ind} onClick={(evt) => changeStep(evt, ind)}>
                        <StepLabel StepIconComponent={StepIcon}>
                            {ind + 1}. {step}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

        </div>
    );
};
