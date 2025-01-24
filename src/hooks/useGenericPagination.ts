import * as React from 'react';

import type { CreatePaginationStore, PaginationState } from './createPaginationStore';

type UsePaginationParams = {
	onChangePagination?: (
		paginationState: Pick<PaginationState, 'skip' | 'take' | 'orderByColumn' | 'orderByAsc'>
	) => void;
	store: ReturnType<CreatePaginationStore>;
};

export function useGenericPagination({ onChangePagination, store }: UsePaginationParams) {
	const paginationRef = React.useRef(0);
	const pagination = store();

	React.useEffect(() => {
		const isFirstRender = paginationRef.current === 0;
		if (!isFirstRender && onChangePagination) {
			onChangePagination({
				skip: pagination.skip,
				take: pagination.take,
				orderByColumn: pagination.orderByColumn,
				orderByAsc: pagination.orderByAsc,
			});
		}
		paginationRef.current = 1;
	}, [onChangePagination, pagination.skip, pagination.take, pagination.orderByColumn, pagination.orderByAsc]);

	return {
		...pagination,
		/**
		 * Use when the value is set for material component ui <TablePagination />[https://mui.com/material-ui/api/table-pagination/#props]
		 *
		 * material UI - uses the page as an index starting at 0
		 */
		pageMUITablePagination: pagination.page - 1,
		/**
		 * Use when the value is set for material component ui <TablePagination />[https://mui.com/material-ui/api/table-pagination/#props]
		 */
		setPageMUITablePagination: (page: number) => pagination.setPage(page + 1),
	};
}
