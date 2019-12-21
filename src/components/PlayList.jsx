import React from 'react';
import * as PropTypes from 'prop-types';
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

PlayList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object)
};

export default PlayList;