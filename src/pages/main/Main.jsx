import {Comment} from '../../components/comment/Comment';
import {PlayerStepper} from '../../components/stepper/PlayerStepper';
import {getActiveStep} from '../../functions';
import React from 'react';

export const Main = ({playerActive, setPlayerActive, playlist, setPlaylist, changePlaylist, setIsStepperSubmenu}) => (
    <>

        {playlist && playerActive ?
            <Comment setPlayerActive={setPlayerActive}/> :
            <PlayerStepper activeStep={getActiveStep(playlist, playerActive)}
                           playlist={playlist} setPlaylist={setPlaylist} changePlaylist={changePlaylist}
                           playerActive={playerActive} setPlayerActive={setPlayerActive}
                           showSubmenu={setIsStepperSubmenu}/>
        }
    </>
);