import * as React from 'react';

import { type PaginationState, createPaginationStore } from './createPaginationStore';

interface UsePaginationParams {
	onChangePagination?: (paginationState: PaginationState) => void;
	store: ReturnType<typeof createPaginationStore>;
}

export function useGenericPagination({ onChangePagination, store }: UsePaginationParams) {
	const pagination = store();

	React.useEffect(() => {
		if (onChangePagination) {
			onChangePagination(pagination);
		}
	}, [pagination, onChangePagination]);

	return pagination;
}
