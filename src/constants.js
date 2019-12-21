const url = window.location.origin;
export const APP_ROOT = ((url.match(/github\.io/gi)) ? '/playlist/' : '');

export const PLAYLISTS = [
    {
        'title': 'Santiano',
        'href': APP_ROOT + 'data/playlistSantiano.json',
        'fromJson': true,
        'content': null,
        'default': true
    },
    {
        'title': 'Zaz',
        'href': APP_ROOT + 'data/playlistZaz.json',
        'fromJson': true,
        'content' : null,
        'default': true
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
 * Поэтому- пока странное ниже... Кажется, в этой версии MUI не ко всем элементам можно применять классы.
 * В примерах стилизуют через родительские селекторы. Баг или фича?
 */
export const MARGINAUTO = {marginLeft: 'auto', marginRight: '10px'};
export const MARGINRIGHT = { marginRight: '10px'};

export const PLAYER_STEPS =  ['Выбрать плейлист', 'Включить плеер', 'Запустить проигрывание плейлиста'];
export const PLAYER_STEPS_ICONS = ['SelectList', 'On', 'Play'];