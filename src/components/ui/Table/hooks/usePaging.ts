import * as React from 'react';

type UsePagingParams = {
	count: number;
	initialRowsPerPage?: number;
	initialPage?: number;
};

export function usePaging({ count, initialRowsPerPage = 10, initialPage = 0 }: UsePagingParams) {
	const [page, setPage] = React.useState(initialPage);
	const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);

	const actions = React.useMemo(
		() => ({
			onPageChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
				setPage(page);
			},
			onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				setRowsPerPage(+event.target.value);
				setPage(0);
			},
		}),
		[setPage, setRowsPerPage]
	);

	return React.useMemo(
		() => ({
			count,
			page,
			rowsPerPage,
			...actions,
		}),
		[count, page, rowsPerPage, actions]
	);
}
