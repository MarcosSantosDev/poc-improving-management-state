import { Sort } from '../@types/pagination';
import { usePaging } from './usePaging';
import { useSorting } from './useSorting';

export function useTable<T>(
	allItems: T,
	{ sortKey = '', sortDir = 'desc' }: Sort,
	{ totalPages = 0 }: { totalPages: number }
) {
	const sorting = useSorting({
		sortKey,
		sortDir,
	});

	const paging = usePaging({
		count: totalPages,
	});

	return {
		showingItems: allItems,
		sorting,
		paging,
	};
}
