import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    drawer: {
        '&>*': {
            maxWidth: '90%',
            textAlign: 'center'
        }
    },
    paper: {
        overflow: 'auto',
        padding: theme.spacing(2)
    }
}));