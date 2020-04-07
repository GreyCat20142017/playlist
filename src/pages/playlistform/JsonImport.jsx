import React, {useEffect, useRef, useState} from 'react';
import {Button, ButtonGroup, Typography} from '@material-ui/core';
import {getClearData, getFilteredData} from '../../functions';
import {MUIIcon} from '../../components/icon/MUIIcon';
import {MUITable} from '../../components/components';
import {useStyles} from './playlistform.css';

const reader = new FileReader();

export const JsonImport = ({content, setContent, setImportJson, title}) => {
    const [status, setStatus] = useState(null);
    const [jsonContent, setJsonContent] = useState([]);
    const ref = useRef();

    const classes = useStyles();

    useEffect(() => {
        const onLoad = () => {
            const fileContent = JSON.parse(reader.result);
            setJsonContent(fileContent ? getClearData(getFilteredData(fileContent)) : []);
        };
        reader.addEventListener('load', onLoad);

        return () => {
            if (reader) {
                reader.removeEventListener('load', onLoad);
            }
        };
    }, []);


    const showJsonContent = () => {
        const curFiles = ref.current.files;
        if ((reader && curFiles && curFiles.length > 0) && (curFiles[0].type === 'application/json')) {
            const file = curFiles[0];
            setStatus(file.name);
            reader.readAsText(file, 'UTF-8');
        } else {
            setStatus('Необходимо выбрать json файл');
            setJsonContent([]);
        }
    };

    const addContent = () => {
        setContent([...content, ...jsonContent]);
        setImportJson(false);
    };

    const rewriteContent = () => {
        setContent([...jsonContent]);
        setImportJson(false);
    };

    return (
        <div className={classes.wrapper}>
            <Typography variant={'subtitle1'} color={'error'}>Редактируемый плейлист: "{title}"</Typography>
            <label className={classes.label} title={'Выбрать json-файл для загрузки содержимого'}>
                <MUIIcon icon={'FromJson'}/>
                <span>Json-file:&nbsp;</span>
                <span>{status || ' не выбран'}</span>
                <input type={'file'} ref={ref} onChange={showJsonContent} accept={'*.json'}
                       style={{visibility: 'hidden'}}/>
            </label>

            {jsonContent && jsonContent.length > 0 ?
                <>
                    <MUITable data={jsonContent} size={'small'} TracksLimit={10} columns={['title', 'link']}
                              tableTitle={'Содержимое файла'} forceFirst={true}
                              hoverField={'title'} actions={{}}/>
                    <ButtonGroup className={classes.btnGroup} color={'primary'} variant={'contained'}>
                        <Button onClick={addContent} title='добавить к текущему плейлисту'>
                            Добавить к текущему плейлисту
                        </Button>
                        <Button onClick={rewriteContent} title='перезаписать список треков текущего плейлиста'>
                            Перезаписать плейлист
                        </Button>
                    </ButtonGroup>
                </> :
                <Typography className={classes.prompt} variant={'caption'}>Необходимо выбрать файл *.json, содержащий
                    список треков</Typography>
            }
            <Button color={'primary'} variant={'outlined'} onClick={() => setImportJson(false)}
                    title='вернуться к списку'>
                назад к списку треков плейлиста
            </Button>
        </div>
    );
};