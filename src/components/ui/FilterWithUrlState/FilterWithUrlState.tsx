import * as React from 'react';

import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { Button } from '../Button/Button';
import TextInput from '../Input/TextInput';
import Select from '../Select/Select';

type FilterFormValues = {
	search: string;
	category: string;
};

const FilterWithUrlState = () => {
	const { register, handleSubmit, setValue, control, reset } = useForm<FilterFormValues>({
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

	const handleClearFilters = () => {
		setSearchParams('');
		reset();
	};

	return (
		<div className="w-full space-y-20">
			<div className="flex justify-between">
				<h2 className="text-lg">Filtros: 0</h2>
				<Button
					type="button"
					variant="ghost"
					size="md"
					icon="plus"
				>
					Salvar Filtros
				</Button>
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
