import * as React from 'react';

import Table from '@/components/ui/Table';
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
		<div className="h-min w-full space-y-20 p-6">
			<h1 className="text-center text-lg font-bold">Paginação 01</h1>
			<div className="flex justify-center">
				<Table.Pagination
					count={pagination01.totalItems}
					page={pagination01.pageMUITablePagination}
					onPageChange={(_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, value: number) => {
						pagination01.setPageMUITablePagination(value);
					}}
					rowsPerPage={pagination01.pageSize}
					onRowsPerPageChange={(event) => pagination01.setPageSize(Number(event.target.value))}
				/>
			</div>
		</div>
	);
};

export default Component01;
