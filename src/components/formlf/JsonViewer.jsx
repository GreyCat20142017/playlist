import React from 'react';
import {Button, Divider, Typography} from '@material-ui/core';

export const JsonViewer = ({content, setShowJson}) => (
    <>
        <Typography variant={'caption'} color={'secondary'}>{JSON.stringify(content)}</Typography>
        <Divider/>
        <Typography variant={'caption'}>Это готовый плейлист для сохранения в файле *.json</Typography>
        <Divider/>
        <Button onClick={() => setShowJson(false)} title='вернуться к списку без сохранения текущего плейлиста'>
            назад к списку плейлистов
        </Button>
    </>
);