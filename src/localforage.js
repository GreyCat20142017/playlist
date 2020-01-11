import * as localforage from 'localforage';
import {LFSTORE} from './constants';

localforage.config({
    driver      : localforage.INDEXEDDB,
    name        : 'Playlist',
    version     : 1.0,
    storeName   : LFSTORE,
    description : 'Список плейлистов'
});
export {localforage};