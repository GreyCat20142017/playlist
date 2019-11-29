import {ArrayRowCells} from './ArrayRowCells';
import React from 'react';

export const SimpleArrayRow = ({controls, element, rowInd, moveRow = null}) => (
    <tr className='d-flex align-items-center' key={rowInd}>
        <ArrayRowCells element={element} controls={controls} rowInd={rowInd}/>
    </tr>
);