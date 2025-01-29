import * as React from 'react';

import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

type FilterFormValues = {
	search: string;
	category: string;
};

const FilterWithUrlState = () => {
	const { register, handleSubmit, setValue } = useForm<FilterFormValues>({
		defaultValues: { search: '', category: '' },
	});
	const [searchParams, setSearchParams] = useSearchParams();

	// Atualiza os valores do formulário com os parâmetros da URL ao carregar a página
	React.useEffect(() => {
		const params = Object.fromEntries(searchParams.entries());
		Object.keys(params).forEach((key) => {
			setValue(key as keyof FilterFormValues, params[key] || '');
		});
	}, [searchParams, setValue]);

	// Envia os filtros atualizados para a URL
	const onSubmit = (data: FilterFormValues) => {
		const newParams = new URLSearchParams(data as Record<string, string>);
		setSearchParams(newParams);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				type="text"
				placeholder="Search"
				{...register('search')}
				className="rounded border p-2"
			/>
			<select
				{...register('category')}
				className="ml-2 rounded border p-2"
			>
				<option value="">All Categories</option>
				<option value="books">Books</option>
				<option value="electronics">Electronics</option>
			</select>
			<button
				type="submit"
				className="ml-2 rounded bg-blue-500 p-2 text-white"
			>
				Apply Filters
			</button>
		</form>
	);
};

export default FilterWithUrlState;
