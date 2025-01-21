import { useGenericPagination } from '@/hooks/useGenericPagination';
import React from 'react';

import { usePagination02 } from '@/features/Home/hooks/usePagination02';
import Pagination from '@/components/ui/Pagination';

const Component02 = () => {
	const loadItems = (skip: number, take: number) => {
		// Load items here

		// eslint-disable-next-line no-console
		console.log(`Carregando itens de ${skip} a ${skip + take}`);
	};

	const pagination02 = useGenericPagination({
		store: usePagination02,
		onChangePagination: (paginationState) => {
			loadItems(paginationState.skip, paginationState.take);
		},
	});

	React.useEffect(() => {
		pagination02.setTotalItems(100);
	}, []);

	return (
		<div className="w-full p-6 space-y-20">
			<h1 className="text-center text-lg font-bold">Paginação 02</h1>

			<Pagination
				totalPages={pagination02.totalPages}
				page={pagination02.page}
				setPage={pagination02.setPage}
				pageSize={pagination02.pageSize}
				setPageSize={pagination02.setPageSize}
			/>
		</div>
	)
}

export default Component02;
