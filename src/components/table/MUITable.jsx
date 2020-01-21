import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@material-ui/core';

import {theme} from '../../theme';
import ActionsHeaders from './actions/ActionsHeaders';
import ActionsCells from './actions/ActionsCells';

const useStyles = () => makeStyles({
    root: {
        padding: theme.spacing(1),
        maxWidth: '100%'
    },
    tableWrapper: {
        maxHeight: '90vh',
        overflowY: 'auto',
    },
    spaceBetween: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

const getDisabled = (data, rowInd, actionsDisable) => {
   const result = {disabledActions: [], disabledCondition: false};
   if (data && actionsDisable && actionsDisable['disabledCondition']) {
       const fieldName = actionsDisable.disabledCondition['fieldName'];
       const fieldCondition = actionsDisable.disabledCondition['condition'];
       const fieldValue = data[rowInd][fieldName];
        result.disabledCondition = fieldName && fieldValue && fieldCondition ? (fieldValue === fieldCondition) : false;
        result.disabledActions = [...actionsDisable['disabledActions']];
   }
   return result;
};

const getCell = (row, column, rowIndex) => (row[column] || (column === 'id' ? rowIndex + 1 : ''));

const getHoverTitle = (row, hoverField) => (
    hoverField && row[hoverField] ? hoverField + ' : ' + row[hoverField] : ''
);

/**
 * @param actions = {'delete: {'title' : 'удалить',  icon: 'Delete', callback: }}
 */

const MUITable = ({
                      data, columns, rowsLimit = 10, size = 'small', maxWidth = '100%',
                      hoverField = null, actions = null,
                      tableTitle = null, actionsDisable = null
                  }) => {
    const classes = useStyles(maxWidth);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsLimit);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div style={{maxWidth: maxWidth}}>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>

                    <Typography variant='h6' color={'textPrimary'}>{tableTitle}</Typography>

                    <Table stickyHeader aria-label="таблица" size={size}>
                        <TableHead>
                            <TableRow>
                                {columns.map((column, ind) => (
                                    <TableCell key={ind}>
                                        {column}
                                    </TableCell>
                                ))}
                                <ActionsHeaders actions={actions}/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowInd) =>
                                (
                                    <TableRow key={rowInd} title={getHoverTitle(row, hoverField)}>
                                        {columns.map((column, ind) => (
                                                <TableCell key={rowInd + '_' + ind}>
                                                    {getCell(row, column, rowInd + rowsPerPage * page)}
                                                </TableCell>
                                            )
                                        )}
                                        {actions &&  <ActionsCells actions={actions} rowInd={rowInd + rowsPerPage * page}
                                                                   {...getDisabled(data, rowInd, actionsDisable)}
                                        />}
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>

                    <TablePagination className={classes.selectRoot} size={'small'}
                                     rowsPerPageOptions={[5, 10, 15]}
                                     labelRowsPerPage={''}
                                     component="div"
                                     count={data.length}
                                     rowsPerPage={rowsPerPage}
                                     page={page}
                                     onChangePage={handleChangePage}
                                     onChangeRowsPerPage={handleChangeRowsPerPage}/>
                </div>
            </Paper>
        </div>
    );
};

MUITable.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    rowsLimit: PropTypes.number,
    size: PropTypes.string,
    maxWidth: PropTypes.string,
    hoverField: PropTypes.string || null,
    actions: PropTypes.object || null
};

export default MUITable;