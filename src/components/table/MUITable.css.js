import {makeStyles} from '@material-ui/core';
import {theme} from '../../theme';

export const useStyles = () => makeStyles({
    root: {
        padding: theme.spacing(1),
        maxWidth: '100%'
    },
    tableWrapper: {
        maxHeight: '90vh',
        overflowY: 'auto',
    },
    spaceBetween: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});