import React from 'react';

import {Typography} from '@material-ui/core';

import MUITable from './table/MUITable';
import {getTextForm} from '../functions';
import {ROWS_LIMIT} from '../constants';

const PlayList = ({title, data}) => (
    <>
        <div style={{paddingTop: '20px'}}>
            <Typography style={{marginBottom: '10px'}} variant={'h6'}>
                {title} ({data.length} {getTextForm(data.length, ['трек', 'трека', 'треков'])})
            </Typography>
            <MUITable data={data} columns={['id', 'title']} rowsLimit={ROWS_LIMIT} size={'small'}
                      maxWidth={'300px'}/>
        </div>
    </>
);

export default PlayList;