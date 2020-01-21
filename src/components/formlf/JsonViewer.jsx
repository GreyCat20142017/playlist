import React, {useEffect, useRef} from 'react';
import {Button, Divider, Typography} from '@material-ui/core';

const selectContent = (node) => {
    const contentRange = window.document.createRange();
    contentRange.selectNodeContents(node);
    const contentSelection = window.getSelection();
    contentSelection.removeAllRanges();
    contentSelection.addRange(contentRange);
};

export const JsonViewer = ({content, setShowJson}) => {
    const ref = useRef();

    useEffect(() => {
      selectContent(ref.current)
    }, []);

    return (
        <>
            <Typography ref={ref} variant={'caption'} color={'secondary'}>
                {JSON.stringify(content)}
            </Typography>
            <Divider/>
            <Typography variant={'caption'}>Это готовый плейлист для сохранения в файле *.json</Typography>
            <Divider/>
            <Button onClick={() => setShowJson(false)} title='вернуться к списку'>
                назад к списку треков плейлиста
            </Button>
        </>
    );
};