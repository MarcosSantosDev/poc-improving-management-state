import * as React from 'react';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Snackbar, Tooltip } from '@mui/material';
import MUITableBody from '@mui/material/TableBody';
import MUITableCell, { type TableCellProps as MUITableCellProps } from '@mui/material/TableCell';
import MUITableRow from '@mui/material/TableRow';

import clsx from 'clsx';

type TableCellProps = {
	children: React.ReactNode;
	width?: number | string;
} & MUITableCellProps;

type CellWithLargeTextProps = {
	disableTooltip?: boolean;
	text?: string;
	maxLength?: number;
};

type TableCellSuperProps = {
	children: React.ReactNode;
	className?: string;
	width?: number | string;
	messageError?: string;
	formatData?: (value: React.ReactNode) => React.ReactNode;
} & MUITableCellProps;

export const TableBody = MUITableBody;

export const TableRow = MUITableRow;

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(({ children, width, ...rest }, ref) => (
	<MUITableCell
		align="left"
		style={{ width }}
		ref={ref}
		{...rest}
	>
		{children}
	</MUITableCell>
));

const maxSizeOfCaracters = 70;

const CellWithLargeText = React.memo<CellWithLargeTextProps>(
	({ disableTooltip = false, text = '', maxLength = maxSizeOfCaracters }) => {
		const [tooltipOpen, setTooltipOpen] = React.useState(false);
		const [openCopySnackbar, setOpenCopySnackbar] = React.useState(false);

		const truncatedText = `${text.slice(0, maxLength)}...`;

		const handleCopyToClipboard = (text: string) => {
			setOpenCopySnackbar(true);
			navigator.clipboard.writeText(text);
		};

		if (text.length > maxLength) {
			return (
				<Tooltip
					open={tooltipOpen}
					onClose={() => {
						if (!disableTooltip) {
							setTooltipOpen(false);
						}
					}}
					onOpen={() => {
						if (!disableTooltip) {
							setTooltipOpen(true);
						}
					}}
					title={text}
					placement="top"
				>
					<div>
						<button
							type="button"
							className="text-14 rounded-2 group flex gap-8 border-b border-gray-100 bg-transparent p-0 py-4 font-normal hover:border-gray-400"
							onClick={() => {
								handleCopyToClipboard(text);
							}}
						>
							{truncatedText}
							<FileCopyIcon className="invisible transition-all group-hover:visible" />
						</button>
						<Snackbar
							open={openCopySnackbar}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
							onClose={() => setOpenCopySnackbar(false)}
							autoHideDuration={2000}
							message="Copiado para área de transferência"
						/>
					</div>
				</Tooltip>
			);
		}

		return text;
	}
);

export const TableCellSuper = React.forwardRef<HTMLTableCellElement, TableCellSuperProps>(
	({ children, className, width, messageError, formatData, ...rest }, ref) => {
		const transformChildrenValue = (childrenValue: React.ReactNode): React.ReactNode => {
			if (childrenValue) {
				if (['string', 'number'].includes(typeof childrenValue)) {
					if (typeof formatData === 'function') {
						return formatData(childrenValue) ?? '-';
					}
				}

				return childrenValue;
			}

			return '-';
		};

		const cellWithError = !!messageError;

		const transformChildren = (childrenValue: React.ReactNode): React.ReactNode => {
			const children = transformChildrenValue(childrenValue);

			if (typeof children === 'string') {
				return (
					<CellWithLargeText
						disableTooltip={cellWithError}
						text={children}
						maxLength={70}
					/>
				);
			}

			return children;
		};

		return (
			<Tooltip
				title={messageError ?? ''}
				followCursor
			>
				<TableCell
					width={width}
					ref={ref}
					className={clsx(className, {
						'text-red cursor-pointer bg-[#f4433626]': cellWithError,
					})}
					{...rest}
				>
					{transformChildren(children)}
				</TableCell>
			</Tooltip>
		);
	}
);
