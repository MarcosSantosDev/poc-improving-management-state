import * as React from 'react';

import { type PaginationState, createPaginationStore } from './createPaginationStore';

interface UsePaginationParams {
	onChangePagination?: (paginationState: PaginationState) => void;
	store: ReturnType<typeof createPaginationStore>;
	itemsPerPage?: number;
}

export function useGenericPagination({ onChangePagination, store, itemsPerPage = 10 }: UsePaginationParams) {
	const pagination = store();

	React.useEffect(() => {
		if (onChangePagination) {
			onChangePagination(pagination);
		}
	}, [pagination, onChangePagination]);

	React.useEffect(() => {
		// Atualiza o número de itens por página
		store.setState({ itemsPerPage: itemsPerPage });
	}, [itemsPerPage]);

	return pagination;
}
