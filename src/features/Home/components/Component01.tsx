import * as React from 'react';

import Pagination from '@/components/ui/Pagination';
import { usePagination01 } from '@/features/Home/hooks/usePagination01';
import { useGenericPagination } from '@/hooks/useGenericPagination';

const Component01 = () => {
	const loadItems = (skip: number, take: number) => {
		// Load items here

		// eslint-disable-next-line no-console
		console.log(`Carregando itens de ${skip} a ${skip + take}`);
	};

	const pagination01 = useGenericPagination({
		store: usePagination01,
		onChangePagination: (paginationState) => {
			loadItems(paginationState.skip, paginationState.take);
		},
	});

	React.useEffect(() => {
		pagination01.setTotalItems(100);
	}, []);

	return (
		<div className="w-full space-y-20 p-6">
			<h1 className="text-center text-lg font-bold">Paginação 01</h1>

			<Pagination
				totalPages={pagination01.totalPages}
				page={pagination01.page}
				setPage={pagination01.setPage}
				pageSize={pagination01.pageSize}
				setPageSize={pagination01.setPageSize}
			/>
		</div>
	);
};

export default Component01;
