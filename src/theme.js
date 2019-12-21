import {createMuiTheme} from '@material-ui/core/styles';

import {blueGrey, deepOrange, indigo} from '@material-ui/core/colors';

export const DEFAULT_COLOR = 'rgba(89, 105, 141, 0.3)';
export const MDB_COLOR = '#59698d';

export const theme = createMuiTheme({

    palette: {
        primary: {
            main: MDB_COLOR,
            light: DEFAULT_COLOR
        },
        secondary: {
            main: blueGrey[200],
        },
        error: deepOrange,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },

    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Arial',
        'sans-serif'
    ].join(','),
    typography: {
        h1: {
            fontSize: 24,
            color: indigo[500],
            fontWeight: 'bold'
        },
        h2: {
            fontSize: 20,
            color: indigo[500],
            fontWeight: 'bold',
            padding: '0.5em'
        }
    }
});


