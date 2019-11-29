import React from 'react';

const getControl = (Control, callback, buttonType, colInd, rowInd) => (
    <Control key={rowInd + ' ' + colInd} callback={callback} buttonType={buttonType} ind={rowInd}/>
);

export const ArrayRowCells = ({element, controls = [], rowInd}) => (
    <React.Fragment>
        <td className='flex-grow-1 text-left px-4 py-1'>{element}</td>
        {controls.length > 0 ?
            <td className='d-flex align-items-center justify-content-start flex-nowrap h-100'>
                {controls.map((control, colInd) => getControl(control.Control, control.callback, control.buttonType, colInd, rowInd))}
            </td> : null
        }
    </React.Fragment>
);