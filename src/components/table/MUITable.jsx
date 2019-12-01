import React, {useState} from 'react';

import {Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, makeStyles} from '@material-ui/core';
import {theme} from '../../theme';

const useStyles = () => makeStyles({
    root: {
        padding: theme.spacing(1),
        maxWidth: '100%'
    },
    tableWrapper: {
        maxHeight: '90vh',
        overflowY: 'auto',
    }
});


const getCell = (row, column, rowIndex) => (row[column] || (column === 'id' ? rowIndex + 1 : ''));

const getHoverTitle = (row, hoverField) => (
    hoverField && row[hoverField] ? hoverField + ' : ' + row[hoverField] : ''
);

const MUITable = ({data, columns, rowsLimit = 10, size = 'small', maxWidth = '100%', hoverField = null}) => {
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
                    <Table stickyHeader aria-label="таблица" size={size}>
                        <TableHead>
                            <TableRow>
                                {columns.map((column, ind) => (
                                    <TableCell key={ind}>
                                        {column}
                                    </TableCell>
                                ))}
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

export default MUITable;