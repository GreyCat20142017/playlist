import {makeStyles} from '@material-ui/core/styles';
import {theme} from '../../theme';

export const useStepperStyles = makeStyles({
        root: {
            width: '100%',
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        rootStep: {
            backgroundColor: '#ccc',
            zIndex: 1,
            color: '#fff',
            width: 30,
            height: 30,
            display: 'flex',
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        active: {
            backgroundColor: theme.palette.primary.main,
            boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.25)',
        },
        completed: {
            backgroundColor: theme.palette.primary.light,
            boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.25)',
        }
    }
);
