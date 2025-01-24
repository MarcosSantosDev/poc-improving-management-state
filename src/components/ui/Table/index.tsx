import { PropsWithChildren } from 'react';

import MuiTable from '@mui/material/Table';
import MuiTableContainer from '@mui/material/TableContainer';

import { useStyles } from './hooks/useStyles';
import { useTable } from './hooks/useTable';
import { TableBody, TableRow, TableCell } from './Table.body';
import { TableColumn, TableHead } from './Table.head';
import { PagingComponent } from './Table.paging';

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

Table.Column = TableColumn;
Table.Header = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Paging = PagingComponent;
Table.useTable = useTable;

export default Table;
