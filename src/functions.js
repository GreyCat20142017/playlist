import {LONG, PLAYLISTS, SHORT, YOUTUBE_ID_LENGTH} from './constants';

const isLong = (url) => {
    return (url.indexOf(LONG) !== -1);
};

const isShort = (url) => {
    return (url.indexOf(SHORT) !== -1);
};

const truncAdditionalParams = (url) => (url.split('&')[0]);

const strReplace = (source, pattern, fragment = '') => source.split(pattern).join(fragment);

export const extractYoutubeId = (url) => {
    let result = truncAdditionalParams(url);
    result = isLong(url) ? strReplace(result, LONG) : result;
    result = isShort(url) ? strReplace(result, SHORT) : result;
    return result.length === YOUTUBE_ID_LENGTH ? result : '';
};

export const getPlaylists = () => (
    PLAYLISTS.map((item, ind) => ({
        key: ind,
        href: ind,
        text: item['title']
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