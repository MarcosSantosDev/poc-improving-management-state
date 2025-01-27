import * as React from 'react';

import type { CreatePaginationStore, PaginationState } from './createPaginationStore';

type UsePaginationParams = {
	onChangePagination?: (
		paginationState: Pick<PaginationState, 'skip' | 'take' | 'orderByColumn' | 'orderByAsc'>
	) => void;
	storeKey: string;
	storeHook: ReturnType<CreatePaginationStore>;
};

const genericPaginationManagementStoreKey = 'genericPaginationManagement';

export function useGenericPagination({ onChangePagination, storeKey, storeHook }: UsePaginationParams) {
	if (storeKey) {
		throw new Error('The "storeKey" variable is required in the parameters of the "useGenericPagination" hook');
	}

	const paginationRef = React.useRef(0);
	const pagination = storeHook();

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

	React.useEffect(() => {
		const paginationKeysString = localStorage.getItem(genericPaginationManagementStoreKey);
		if (paginationKeysString) {
			const paginationKeys = JSON.parse(paginationKeysString) as string[];
			const storeKeyIsInStorage = paginationKeys.some((key) => key === storeKey);

			if (!storeKeyIsInStorage) {
				paginationKeys.push(storeKey);
			}
		}
	}, [storeKey]);

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

export function removeAllGenericPagination() {
	const paginationKeysString = localStorage.getItem(genericPaginationManagementStoreKey);
	if (paginationKeysString) {
		const paginationKeys = JSON.parse(paginationKeysString) as string[];

		paginationKeys.forEach((paginationKey) => {
			localStorage.removeItem(paginationKey);
		});
	}
}

export function removeGenericPaginationManagement() {
	localStorage.removeItem(genericPaginationManagementStoreKey);
}
