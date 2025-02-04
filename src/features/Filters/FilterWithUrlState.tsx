import * as React from 'react';

import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import Autocomplete from '@/components/ui/Autocomplete/Autocomplete';
import { Button } from '@/components/ui/Button/Button';
import TextInput from '@/components/ui/Input/TextInput';
import Select from '@/components/ui/Select/Select';

type FilterFormValues = {
	search: string;
	category: string;
};

const getFilters = async () => {
	const response = await axios.get('http://localhost:3001/filters');
	return response.data;
};

const useLoadFilters = () => {
	return useQuery<
		{
			name: string;
			route: string;
			urlFilter: string;
		}[]
	>({
		queryKey: ['filters'],
		queryFn: getFilters,
	});
};

const FilterWithUrlState = () => {
	const { register, handleSubmit, setValue, control, reset } = useForm<FilterFormValues>();
	const [searchParams, setSearchParams] = useSearchParams();

	const { data } = useLoadFilters();

	const setUrlOnSubmit = (data: FilterFormValues) => {
		// Envia os filtros atualizados para a URL
		const formattedData = Object.fromEntries(Object.entries(data).filter(([, value]) => value?.length));
		const newParams = new URLSearchParams(formattedData as Record<string, string>);
		setSearchParams(newParams);
	};

	const onSubmit = (data: FilterFormValues) => {
		setUrlOnSubmit(data);
	};

	const handleClearFilters = () => {
		setSearchParams('');
		reset();
	};

	// Atualiza os valores do formulário com os parâmetros da URL ao carregar a página
	React.useEffect(() => {
		const params = Object.fromEntries(searchParams.entries());
		Object.keys(params).forEach((key) => {
			setValue(key as keyof FilterFormValues, params[key] || '');
		});
	}, [searchParams, setValue]);

	return (
		<div className="w-full space-y-20">
			<div className="flex justify-between">
				<h2 className="text-lg">Filtros</h2>

				<div className="flex w-[300px] space-x-4">
					<Autocomplete.UncontrolledAutocomplete
						label="Meus filtros"
						name="myFilters"
						options={
							data?.map((filter) => ({
								label: filter.name,
								value: filter.name,
							})) || []
						}
						onChange={(_event, selectedOption) => {
							if (selectedOption) {
								const selectedFilter = data?.find((filter) => filter.name === selectedOption?.value);
								if (selectedFilter) {
									setSearchParams(selectedFilter.urlFilter);
								}
							} else {
								handleClearFilters();
							}
						}}
					/>
					<Button
						type="button"
						variant="ghost"
						size="md"
						icon="plus"
					>
						Salvar Filtros
					</Button>
				</div>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-20"
			>
				<div className="grid grid-cols-2 gap-10">
					<TextInput.UncontrolledInput
						{...register('search')}
						label="Pesquisar"
						placeholder="Search"
					/>

					<Select.ControlledSelect
						control={control}
						name="category"
						id="category"
						label="Category"
						options={[
							{ value: '', label: 'All Categories' },
							{ value: 'books', label: 'Books' },
							{ value: 'electronics', label: 'Electronics' },
						]}
					/>
				</div>
				<div className="flex justify-between">
					<Button
						type="button"
						variant="destructive"
						size="md"
						icon="trash"
						onClick={() => handleClearFilters()}
					>
						Limpar Filtros
					</Button>
					<Button
						type="submit"
						variant="primary"
						size="md"
						icon="search"
					>
						Aplicar Filtros
					</Button>
				</div>
			</form>
		</div>
	);
};

export default FilterWithUrlState;
