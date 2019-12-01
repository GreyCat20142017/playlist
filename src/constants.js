const url = window.location.origin;
export const APP_ROOT = ((url.match(/github\.io/gi)) ? '/playlist' : '');

export const PLAYLISTS = [
    {
        'title': 'Santiano',
        'href': APP_ROOT + '/data/playlistSantiano.json'
    },
    {
        'title': 'Zaz',
        'href': APP_ROOT + '/data/playlistZaz.json'
    }
];

export const YOUTUBE_ID_LENGTH = 11;
export const SHORT = 'https://youtu.be/';
export const LONG = 'https://www.youtube.com/watch?v=';
export const YOUTUBE_EMBED = 'https://www.youtube.com/embed/';

export const KEYCODES = {
    ENTER: 13,
    ESC: 27
};

export const LOCAL_STORAGE = 'playlists';

export const ROWS_LIMIT = 10;

/**
 * Пока непонятно, почему в новой версии какие-то проблемы с применением некоторых стилей.
 * Поэтому- пока странное ниже...
 */
export const MARGINLEFT = {marginLeft: 'auto', marginRight: '10px'};
