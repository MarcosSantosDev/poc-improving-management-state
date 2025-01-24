import MUITablePagination from '@mui/material/TablePagination';

type TablePaginationProps = {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void;
	onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const TablePagination = ({
	count,
	page,
	rowsPerPage,
	onPageChange,
	onRowsPerPageChange,
}: TablePaginationProps) => (
	<MUITablePagination
		component="div"
		page={page}
		count={count}
		rowsPerPage={rowsPerPage}
		onPageChange={onPageChange}
		onRowsPerPageChange={onRowsPerPageChange}
		labelRowsPerPage="Linhas por página"
		labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
		className="max-h-52 overflow-hidden rounded-b-md"
	/>
);
