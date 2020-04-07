import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button, ButtonGroup, Typography} from '@material-ui/core';
import {Add} from '@material-ui/icons';

import {MUIIcon, MUITable} from '../../components/components';
import {ALERT_TYPES, PLAYLIST_TYPE} from '../../constants';
import {getTableActions} from '../../functions';
import {ROUTES} from '../../routes';

const actionsDisable = {
    disabledActions: ['edit', 'delete'], disabledCondition: {fieldName: 'type', condition: PLAYLIST_TYPE.DEFAULT}
};

const PlaylistDialogControls = ({history, lists, onCreate, onCreateJson, onDelete, onEdit, onExport, setAlert}) => {
    const onCloseClick = () => history.push(ROUTES.MAIN);
    return (
        <>
            <ButtonGroup style={{margin: '7px'}}>
                <Button variant={'outlined'} onClick={onCreateJson} title={'добавить Json-плейлист'}
                        size={'small'} color={'primary'}>
                    <Add/> <Typography variant={'caption'}>Json</Typography>
                </Button>
                <Button variant={'outlined'} onClick={onCreate} title={'добавить редактируемый плейлист в IndexedDB'}
                        size={'small'} color={'primary'}>
                    <Add/> <Typography variant={'caption'}>Db</Typography>
                </Button>
            </ButtonGroup>
            <MUITable data={lists || []} size={'small'} rowsLimit={5} columns={['title', 'type', 'key']}
                      hoverField={'href'} actions={getTableActions(onDelete, onEdit, onExport)}
                      actionsDisable={actionsDisable}/>
            <div style={{flexWrap: 'wrap', justifyContent: 'center', maxWidth: '100%', padding: '24px'}}>
                <Button color='primary' variant='contained' title={'Закрыть список плейлистов'} onClick={onCloseClick}>
                    Закрыть&nbsp;<MUIIcon icon={'Paw'}/>
                </Button>
                <Button variant='outlined' onClick={() => setAlert(ALERT_TYPES.LS)} title={'очистить LocalStorage'}>
                    Очистить LocalStorage
                </Button>
                <Button variant='outlined' onClick={() => setAlert(ALERT_TYPES.LF)} title={'Очистить IndexedDB'}>
                    Очистить IndexedDB
                </Button>
            </div>
        </>
    );
};

export default withRouter(PlaylistDialogControls);