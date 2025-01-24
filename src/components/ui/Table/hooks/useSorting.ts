import * as React from 'react';

import { Sort } from '../@types/pagination';

export const useSorting = (initialState?: Sort) => {
	const [sort, setSort] = React.useState<Sort>({
		sortDir: 'asc',
		sortKey: '',
		...(initialState || {}),
	});

	const onSort = (newSortKey: string) => {
		const isAsc = sort.sortKey === newSortKey && sort.sortDir === 'asc';
		setSort({
			sortKey: newSortKey,
			sortDir: isAsc ? 'desc' : 'asc',
		});
	};

	return {
		onSort,
		...sort,
	};
};
