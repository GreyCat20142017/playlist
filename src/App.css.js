import {makeStyles} from '@material-ui/core/styles';
import {theme} from './theme';

const mainColor = theme.palette.primary.main;

export const useStyles = makeStyles({
        app: {
            textAlign: 'center',
            padding: theme.spacing(0),
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        },
        paper: {
            padding: theme.spacing(1),
            width: 'auto'
        },
        paperWhite: {
            width: '100%',
            flexGrow: 1,
            padding: '20px'
        },
        link: {
            textDecoration: 'none',
            color: 'white'
        },
        linkDark: {
            textDecoration: 'none',
            color: mainColor
        },
        mLeft: {
            marginLeft: 'auto',
            marginRight: theme.spacing(1)
        },
        drawer: {
            width: '320px',
            padding: theme.spacing(1),
            textAlign: 'center'
        },
        submenu: {
            display: 'flex',
            flexDirection: 'column'
        },
        courses: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(1),
            marginTop: theme.spacing(2)
        },
        courseBtn: {
            width: '100%',
            marginTop: theme.spacing(1)
        },
        lessonBtn: {
            margin: theme.spacing(1)
        },
        card: {
            alignSelf: 'center',
            boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
            maxWidth: '400px',
            [theme.breakpoints.down('sm')]: {
                maxWidth: '250px'
            }
        },
        avatar: {
            backgroundColor: theme.palette.primary.main
        },
        wrapper: {
            width: '100%',
            flexGrow: 1
        },
        spaceBetween: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        paperFlex: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(1),
            width: 'auto'
        },
        paperFlexFull: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(1),
            width: '100%'
        },
       ml: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(2)
       },
       fabCenter: {
            margin: '20px auto 0'
       }
    }
);