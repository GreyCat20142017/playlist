import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Divider, Grid, Paper, Typography} from '@material-ui/core';
import {useStyles} from './About.css';

export const About = () => {
    const [needRedirect, setNeedRedirect] = useState(false);
    const classes = useStyles();

    const redirect = () => setNeedRedirect(true);

    return (
        needRedirect ?
            <Redirect to={'/'}/> :
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant={'subtitle1'}>О программе</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.part} variant={'caption'}>
                            Что-то с чем-то, постепенно обрaстающее всякой ерундой.
                        </Typography>
                        <Divider/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.part} variant={'body2'}>
                            Можно создавать плейлисты со ссылками на готовые списки треков в формате json (тип JSON)
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.part} variant={'body2'}>
                            Можно создавать и редактировать списки прямо здесь (тип IndexedDB)
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.part} variant={'body2'}>
                            Созданные плейлисты можно экспортировать в json и копировать полученное содержимое в файлы,
                            создаваемые вне браузера.
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography className={classes.part} variant={'body2'}>
                            Содержимое редактируемых плейлистов можно загружать из файлов json.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                        <Typography variant={'subtitle1'} style={{marginTop: '20px'}}>
                            Файл json со списком треков - это массив объектов со свойствами title и link
                        </Typography>
                        <Paper className={classes.part}>
                            <Typography variant={'caption'}>{`
                        [
                        {
                            "title": "Какое-то название трека",
                            "link": "https://youtu.be/rHla01hiCqc"
                        }
                        ]`}
                            </Typography>
                        </Paper>

                    </Grid>
                </Grid>

                <Typography variant={'caption'} style={{margin: '20px 0'}}>
                    Редактирование и сохранение списков не работает в режиме inPrivate.
                    Отдельное спасибо обитателям одного чатика, которые наводящими вопросами помогли понять это:-)
                </Typography>

                <Button onClick={redirect} color={'primary'} variant={'outlined'} title={'Перейти на главную'}>
                    на главную
                </Button>
            </Paper>
    );
};
