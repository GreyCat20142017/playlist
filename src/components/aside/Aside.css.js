import {makeStyles} from '@material-ui/core/styles';
import {theme} from '../../theme';

export const useStyles = makeStyles({
    drawer: {
        width: '320px',
        padding: theme.spacing(1),
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    fabCenter: {
        margin: '20px auto 0'
    },
    title: {
        padding: '20px'
    }
});