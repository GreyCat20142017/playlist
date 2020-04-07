import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
        part: {
            padding: '10px',
            textAlign: 'center'
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: '20px'
        },
        drawer: {
            '&>*': {
                maxWidth: '90%',
                textAlign: 'center'
            }
        },
        drawerPaper: {
            overflow: 'auto',
            padding: theme.spacing(2)
        }
    })
);