import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import AlertDialog from '../alert/AlertDialog';
import {LfDialog} from './LfDialog';
import {useDB} from '../../hooks/customHooks';
import {PLAYLIST_TYPE} from '../../constants';

const LfDialogContainer = ({isLfOpen = false, setIsLfOpen, lists, setLists}) => {
    const [edited, setEdited] = useState(null);
    const [showForm, setShowForm] = useState(null);
    const [lfLists, setLfLists] = useState([]);
    const [alertIsOpen, setAlertIsOpen] = useState(false);

    const [, {deletePlaylist, clearStorage}] = useDB(false);

    useEffect(() => {
        setLfLists(lists.filter(list => list.type === PLAYLIST_TYPE.LF));
    }, [isLfOpen, lists]);


    const onClose = () => {
        setIsLfOpen(false);
    };

    const onDelete = (ind) => {
        const key = lfLists[ind]['href'];
        deletePlaylist(key, lists, setLists);
    };

    const onEdit = (ind) => {
        setEdited({...lfLists[ind]});
    };

    const onCreate = () => {
        setEdited({href: null, title: ''});
    };

    const lfClear = () => {
        clearStorage(lists, setLists);
    };

    const onClear = () => {
        setEdited(null);
        setAlertIsOpen(true);
    };

    const props = {
        lfLists, setLfLists, edited, setEdited, isLfOpen, showForm, setShowForm,
        onClose, onDelete, onEdit, onCreate, onClear
    };

    return (
        <>
            <LfDialog {...props}/>

            {alertIsOpen && <AlertDialog message={'полностью очистить IndexedDB со списком локальных плейлистов'}
                                         alertIsOpen={alertIsOpen} setAlertIsOpen={setAlertIsOpen} callback={lfClear}/>
            }
        </>
    );
};

LfDialogContainer.propTypes = {
    isLfOpen: PropTypes.bool,
    setIsLfOpen: PropTypes.func.isRequired,
    lists: PropTypes.arrayOf(PropTypes.object).isRequired,
    setLists: PropTypes.func.isRequired
};

export default LfDialogContainer;