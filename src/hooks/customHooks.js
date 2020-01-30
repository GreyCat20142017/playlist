import {useCallback, useEffect, useState} from 'react';
import {localforage as lf} from '../localforage';
import {LIST_KEY, PLAYLIST_TYPE} from '../constants';

export const useDB = (needGet = true) => {
    const [data, setData] = useState([]);

    const getPlaylists = useCallback(async () => {
        try {
            const tmp = await lf.getItem(LIST_KEY);
            setData(tmp ? tmp.map(item => (
                {title: item['title'], href: item['key'], key: item['key'], type: PLAYLIST_TYPE.LF}
            )) : []);
        } catch (e) {
            setData([]);
        }
    }, []);

    useEffect(() => {
        if (needGet) {
            getPlaylists();
        }
    }, [needGet, getPlaylists]);

    const resetData = useCallback((newList) => {

    }, []);

    const deletePlaylist = useCallback((key, lists, setLists) => {
        lf.removeItem(key).then(() => {
            lf.getItem(LIST_KEY).then(lfdata => {
                const data = lfdata ? lfdata : [];
                lf.setItem(LIST_KEY, data.filter(el =>
                    el.href !== key && typeof el.href !== 'undefined' && el.type === PLAYLIST_TYPE.LF
                )).then(
                    () => setLists(lists.filter(el => el.href !== key))
                );
            });
        });
    }, []);


    const exportToLf = useCallback((key, title, content, lists, setLists) => {
        lf.getItem(LIST_KEY).then(lfdata => {
            const data = lfdata ? lfdata : [];
            const newPlaylist = {title, type: PLAYLIST_TYPE.LF, key: key, href: key};
            lf.setItem(LIST_KEY, [...data, {...newPlaylist}]).then(() => {
                    setLists([...lists, {...newPlaylist}]);
                    lf.setItem(key, content);
                }
            );
        });
    }, []);

    const clearStorage = useCallback((lists, setLists) => {
        lf.clear().then(() => setLists(lists.filter(el => el.type !== PLAYLIST_TYPE.LF)));
    }, []);

    const getDbContent = useCallback(async (key, setContent) => {
        const el = await lf.getItem(key) || [];
        if (setContent) {
            setContent(el);
        }
        return el;
    }, []);


    return [data, {resetData, deletePlaylist, exportToLf, clearStorage, getDbContent}];
};