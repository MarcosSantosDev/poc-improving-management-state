import * as React from 'react';

import type { SubmitHandler } from 'react-hook-form';

import { useFilterForm } from '@/hooks/useFilterForm';

type FilterForm = {
	search: string;
	category: string;
	priceRange: string;
};

const FilterFormComponent: React.FC = () => {
	const defaultValues: FilterForm = {
		search: '',
		category: '',
		priceRange: '',
	};

	const { form, isSaved, toggleSave } = useFilterForm<FilterForm>({
		defaultValues,
		storageKey: 'filter-form',
	});

	const { register, handleSubmit, reset } = form;

	const onSubmit: SubmitHandler<FilterForm> = (data) => {
		// eslint-disable-next-line no-console
		console.log('Dados filtrados:', data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="mx-auto max-w-xl space-y-10 rounded bg-white p-6 shadow"
		>
			<div className="flex w-full justify-between">
				<h2 className="text-lg text-black">Filtro</h2>
				<div className="flex items-center justify-end gap-10">
					<label
						htmlFor="isSavedFilter"
						className="text-sm text-black"
					>
						Salvar filtro
					</label>
					<input
						type="checkbox"
						name="isSavedFilter"
						id="isSavedFilter"
						onClick={toggleSave}
						checked={isSaved}
					/>
				</div>
			</div>
			<div className="flex flex-col">
				<label
					htmlFor="search"
					className="text-sm font-medium text-gray-700"
				>
					Busca
				</label>
				<input
					id="search"
					{...register('search')}
					className="mt-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
					placeholder="Type to search..."
				/>
			</div>
			<div className="flex flex-col">
				<label
					htmlFor="category"
					className="text-sm font-medium text-gray-700"
				>
					Categoria
				</label>
				<select
					id="category"
					{...register('category')}
					className="mt-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
				>
					<option value="">Todos</option>
					<option value="electronics">Eletrônico</option>
					<option value="clothing">Roupas</option>
				</select>
			</div>
			<div className="flex flex-col">
				<label
					htmlFor="priceRange"
					className="text-sm font-medium text-gray-700"
				>
					Intervalo de preço
				</label>
				<input
					id="priceRange"
					{...register('priceRange')}
					className="mt-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
					placeholder="e.g., 10-50"
				/>
			</div>
			<div className="flex items-center justify-between space-x-2">
				<button
					type="submit"
					className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
				>
					Aplicar Filtro
				</button>
				<button
					type="button"
					onClick={() => reset()}
					className="rounded bg-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-400"
				>
					Limpar filtro
				</button>
			</div>
		</form>
	);
};

export default FilterFormComponent;
