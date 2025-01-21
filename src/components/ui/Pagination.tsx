import { Pagination as PaginationMUI } from '@mui/material';

type PaginationProps = {
	totalPages: number;
	page: number;
	setPage: (page: number) => void;
	pageSize: number;
	setPageSize: (pageSize: number) => void;
}

const Pagination = ({ totalPages, page, setPage, pageSize, setPageSize }: PaginationProps) => {
	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<div className="flex items-center justify-center">
			<PaginationMUI
				count={totalPages}
				page={page}
				onChange={handlePageChange}
				color="primary"
			/>

			<div className='w-[200px]'>
				<label>
					Items por pagina:
					<select
						value={pageSize}
						onChange={(e) => setPageSize(Number(e.target.value))}
					>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={50}>50</option>
					</select>
				</label>
			</div>
		</div>
	);
};

export default Pagination;
