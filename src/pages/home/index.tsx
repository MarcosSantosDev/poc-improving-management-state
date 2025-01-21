import * as React from 'react';

import Pagination from '@mui/material/Pagination';

import { createPaginationStore } from '@/hooks/createPaginationStore';
import { useGenericPagination as usePaginationHome } from '@/hooks/usePaginationStorage';

const Home: React.FC = () => {
	const loadItems = (skip: number, take: number) => {
		// Load items here

		// eslint-disable-next-line no-console
		console.log(`Carregando itens de ${skip} a ${skip + take}`);
	};

	const paginationHome = usePaginationHome({
		store: createPaginationStore('pangination-home'),
		itemsPerPage: 10,
		onChangePagination: (paginationState) => {
			loadItems(paginationState.skip(), paginationState.take());
		},
	});

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		paginationHome.goToPage(value);
	};

	React.useEffect(() => {
		paginationHome.setTotalItems(100);
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<h1 className="mb-6 text-3xl font-bold">Home</h1>

			<div className="mt-4 flex justify-center">
				<Pagination
					count={paginationHome.totalPages()}
					page={paginationHome.currentPage}
					onChange={handlePageChange}
					color="primary"
				/>
			</div>
		</div>
	);
};

export default Home;
