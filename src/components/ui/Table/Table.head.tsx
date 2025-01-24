import * as React from 'react';

import TableCell, { type TableCellProps } from '@mui/material/TableCell';
import MuiTableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { makeStyles } from '@mui/styles';

import { SortDir } from './@types/pagination';

type TableHeadProps = {
	sortKey?: string;
	sortDir?: SortDir;
	onSort?: (key: string) => void;
	children: React.ReactNode;
};

type TableColumnProps = {
	id: string;
	children: React.ReactNode;
	cellProps?: TableCellProps;
	className?: string;
	sortable?: boolean;
	sortDir?: SortDir;
	onSort?: (id: string) => void;
};

export const useStyles = makeStyles(() => ({
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
}));

export const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
	({ sortKey = '', sortDir = false, onSort, children, ...rest }, ref) => {
		const hasSorting = !!(sortDir && sortKey && onSort);

		const headers = !hasSorting
			? children
			: React.Children.map(children, (child) =>
				React.cloneElement(child, {
					onSort,
					sortDir: child.props.id === sortKey ? sortDir : false,
					sortable: !hasSorting ? false : child.props.sortable,
				})
			);

		return (
			<MuiTableHead
				ref={ref}
				{...rest}
			>
				<TableRow>{headers}</TableRow>
			</MuiTableHead>
		);
	}
);

export const HeadColumn = React.forwardRef<HTMLTableCellElement, TableColumnProps>(
	({ id, children, cellProps = {}, className = '', sortable = false, sortDir = false, onSort }, ref) => {
		const classes = useStyles();
		const canSort = onSort && sortable;

		return (
			<TableCell
				key={id}
				align="left"
				padding="normal"
				sortDirection={sortDir}
				className={`whitespace-nowrap ${className}`}
				ref={ref}
				{...cellProps}
			>
				{canSort ? (
					<TableSortLabel
						active={!!sortDir}
						direction={sortDir || 'asc'}
						onClick={() => onSort(id)}
					>
						{children}
						{canSort ? (
							<span className={classes.visuallyHidden}>
								{sortDir === 'desc' ? 'sorted descending' : 'sorted ascending'}
							</span>
						) : null}
					</TableSortLabel>
				) : (
					children
				)}
			</TableCell>
		);
	}
);
