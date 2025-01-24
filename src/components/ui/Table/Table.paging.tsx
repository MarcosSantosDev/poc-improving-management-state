import TablePagination from '@mui/material/TablePagination';

type PagingComponentProps = {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void;
	onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const PagingComponent = ({
	count,
	page,
	rowsPerPage,
	onPageChange,
	onRowsPerPageChange,
}: PagingComponentProps) => (
	<TablePagination
		component="div"
		page={page}
		count={count}
		rowsPerPage={rowsPerPage}
		onPageChange={onPageChange}
		onRowsPerPageChange={onRowsPerPageChange}
		labelRowsPerPage="Linhas por página"
		labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
		nextIconButtonProps={{ 'aria-label': 'Next Page' }}
		backIconButtonProps={{ 'aria-label': 'Previous Page' }}
		className="min-h-52 overflow-hidden rounded-b-md"
	/>
);

export default PagingComponent;
