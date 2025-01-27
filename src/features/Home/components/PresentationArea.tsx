import { pagination01StoreKey, usePagination01 } from '@/features/Home/hooks/usePagination01';
import { pagination02StoreKey, usePagination02 } from '@/features/Home/hooks/usePagination02';
import { useGenericPagination } from '@/hooks/useGenericPagination';

const PresentationArea = () => {
	const pagination01 = useGenericPagination({ storeKey: pagination01StoreKey, storeHook: usePagination01 });
	const pagination02 = useGenericPagination({ storeKey: pagination02StoreKey, storeHook: usePagination02 });

	return (
		<div className="text-center">
			<h2 className="text-lg font-bold">Compartilhando estado</h2>
			<p className="text-md font-bold">Paginação 01 - Page: {pagination01.page}</p>
			<p className="text-md font-bold">Paginação 02 - Page: {pagination02.page}</p>
		</div>
	);
};

export default PresentationArea;
