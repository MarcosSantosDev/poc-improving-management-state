import * as React from 'react';

import Table from '@/components/ui/Table';
import { usePagination02 } from '@/features/Home/hooks/usePagination02';
import { useGenericPagination } from '@/hooks/useGenericPagination';

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
		<div className="w-full space-y-20 p-6">
			<h1 className="text-center text-lg font-bold">Paginação 02</h1>
			<div className="flex justify-center">
				<Table.Pagination
					count={pagination02.totalItems}
					page={pagination02.pageMUITablePagination}
					onPageChange={(_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, value: number) => {
						pagination02.setPageMUITablePagination(value);
					}}
					rowsPerPage={pagination02.pageSize}
					onRowsPerPageChange={(event) => pagination02.setPageSize(Number(event.target.value))}
				/>
			</div>
		</div>
	);
};

export default Component02;
