import { PropsWithChildren } from 'react';

import MuiTable from '@mui/material/Table';
import MuiTableContainer from '@mui/material/TableContainer';

import { useStyles } from './hooks/useStyles';
import { useTable } from './hooks/useTable';
import { TableBody, TableRow, TableCell, TableCellSuper } from './Table.body';
import { TablePagination } from './Table.footer';
import { HeadColumn, TableHead } from './Table.head';

type TableProps = {
	minWidth?: string;
};

const Table = ({ children, minWidth }: PropsWithChildren<TableProps>) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<MuiTableContainer>
				<MuiTable
					className={classes.table}
					style={{ minWidth }}
				>
					{children}
				</MuiTable>
			</MuiTableContainer>
		</div>
	);
};

Table.Head = TableHead;
Table.HeadColumn = HeadColumn;

Table.Body = TableBody;
Table.Row = TableRow;

Table.CellSuper = TableCellSuper;
Table.Cell = TableCell;

Table.Pagination = TablePagination;

Table.useTable = useTable;

export default Table;
