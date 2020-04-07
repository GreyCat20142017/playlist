import {makeStyles} from '@material-ui/core/styles';
import {MDB_COLOR, theme} from '../../theme';

export const useStyles = makeStyles({
    textField: {
        color: 'white',
        '&  input': {
            color: 'white'
        },
        '& label': {
            color: 'white'
        }
    },
    lfForm: {
        backgroundColor: MDB_COLOR,
        color: 'white',
        padding: '24px'
    },
    lsForm: {
        padding: '24px'
    },
    buttonGroup: {
        marginTop: '10px'
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
        padding: theme.spacing(2)
    },
    label: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        borderRadius: '5px',
        height: '1em',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        flexShrink: 0,
        padding: '20px 10px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: 'bleck'
        }
    },
    prompt: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    btnGroup: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
});