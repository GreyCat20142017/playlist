import {LOCAL_STORAGE, LONG, PLAYLISTS, SHORT, YOUTUBE_ID_LENGTH} from './constants';

const isLong = (url) => {
    return (url.indexOf(LONG) !== -1);
};

const isShort = (url) => {
    return (url.indexOf(SHORT) !== -1);
};

export const isYoutubeUrl = (url) => (isLong(url)) || isShort(url);

export const isMaybeYoutubeId = (url) => (url.length === YOUTUBE_ID_LENGTH);

const truncAdditionalParams = (url) => (url.split('&')[0]);

const strReplace = (source, pattern, fragment = '') => source.split(pattern).join(fragment);

export const extractYoutubeId = (url) => {
    let result = truncAdditionalParams(url);
    result = isLong(url) ? strReplace(result, LONG) : result;
    result = isShort(url) ? strReplace(result, SHORT) : result;
    return isMaybeYoutubeId(result) ? result : '';
};

export const getPlaylists = (lists) => (
    lists.map((item, ind) => ({
        key: ind,
        href: ind,
        text: item['title'],
        type: item['type']
    })));

export const getTextForm = (sourceNumber, textForms) => {
    sourceNumber = Math.abs(sourceNumber) % 100;
    const temporaryNumber = sourceNumber % 10;
    if (sourceNumber > 10 && sourceNumber < 20) {
        return textForms[2];
    }
    if (temporaryNumber > 1 && temporaryNumber < 5) {
        return textForms[1];
    }
    if (temporaryNumber === 1) {
        return textForms[0];
    }
    return textForms[2];
};

export const getClearData = (data) => data.map(el => {
    el['link'] = el['link'] ? extractYoutubeId(el['link']) : '';
    return el;
});

export const getFilteredData = (data) => (
    Array.isArray(data) ? data.filter(item => (item['title'] && item['link']
        && isValidUrl(item['link']) && isYoutubeUrl(item['link']))) : []
);

export const getLocalPlaylists = () => {
    const storageData = localStorage.getItem(LOCAL_STORAGE) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE)) : [];
    return [...PLAYLISTS, ...storageData];
};

export const setLocalPlaylists = (lists) => {
    let result = null;
    try {
        localStorage.setItem(LOCAL_STORAGE, JSON.stringify(lists.filter(list => !list['default'])));
    } catch (err) {
        result = err.message;
    }
    return result;
};

export const isValidUrl = (url) => {
    const pattern = new RegExp('^(https:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + //port
        '(\\?[;&amp;a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i');
    return pattern.test(url);
};

export const getTableActions = (onDelete = null, onEdit = null, onExport = null) => {
    const actions = {};
    if (onDelete) {
        actions['delete'] = {'title': 'удалить', icon: 'Delete', onCallback: onDelete};
    }
    if (onEdit) {
        actions['edit'] = {'title': 'изменить', icon: 'Edit', onCallback: onEdit};
    }
    if (onExport) {
        actions['export'] = {'title': 'экспорт в LocalForage', icon: 'Storage', onCallback: onExport};
    }
    return actions;
};

export const isData = (data) => (data && Array.isArray(data) && data.length > 0);

export const isValidIndex = (index, testedArray) => (((index >= 0) && (index < testedArray.length)));

export const getActiveStep = (playlist, playerActive) => (
    playerActive && playlist ? 2 : playlist ? 1 : 0
);

export const isError = (errors, fieldName) => (errors && errors[fieldName]);

export const getNewKey = () => ('id-' + (+new Date()));