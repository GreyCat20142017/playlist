import {makeStyles} from '@material-ui/core/styles';
import {MDB_COLOR} from '../../theme';

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
    buttonGroup: {
        marginTop: '10px'
    }
});