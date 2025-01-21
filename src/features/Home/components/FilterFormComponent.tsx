import React from "react";
import { SubmitHandler } from "react-hook-form";

import { useFilterForm } from "@/hooks/useFilterForm";

type FilterForm = {
	search: string;
	category: string;
	priceRange: string;
}

const FilterFormComponent: React.FC = () => {
	const defaultValues: FilterForm = {
		search: "",
		category: "",
		priceRange: "",
	};

	const { form, isSaved, toggleSave } = useFilterForm<FilterForm>({
		defaultValues,
		storageKey: "filter-form",
	});

	const { register, handleSubmit, reset } = form;

	const onSubmit: SubmitHandler<FilterForm> = (data) => {
		console.log("Dados filtrados:", data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-10"
		>
			<div className="w-full flex justify-between">
				<h2 className="text-lg text-black">Filtro</h2>
				<div className="flex justify-end items-center gap-10">
					<label htmlFor="isSavedFilter" className="text-black text-sm">Salvar filtro</label>
					<input type="checkbox" name="isSavedFilter" id="isSavedFilter" onClick={toggleSave} checked={isSaved} />
				</div>
			</div>
			<div className="flex flex-col">
				<label htmlFor="search" className="text-sm font-medium text-gray-700">
					Busca
				</label>
				<input
					id="search"
					{...register("search")}
					className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
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
					{...register("category")}
					className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
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
					{...register("priceRange")}
					className="mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
					placeholder="e.g., 10-50"
				/>
			</div>
			<div className="flex items-center justify-between space-x-2">
				<button
					type="submit"
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
				>
					Aplicar Filtro
				</button>
				<button
					type="button"
					onClick={() => reset()}
					className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
				>
					Limpar filtro
				</button>
			</div>
		</form>
	);
};

export default FilterFormComponent;
