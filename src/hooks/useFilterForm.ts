import { useEffect, useMemo, useState } from "react";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";

interface UseFilterFormProps<T> {
	defaultValues: DefaultValues<T>;
	storageKey: string;
}
/**
 * Possibilidades futuras
 *
 * Salvar filtro do usuário no backend e o hook gerenciar esse filtro usando sua storageKey para buscar na lista de filtros salvos
 */
export const useFilterForm = <T extends FieldValues>({
	defaultValues,
	storageKey,
}: UseFilterFormProps<T>) => {
	const [isSaved, setIsSaved] = useState(() => !!localStorage?.getItem(storageKey));
	const form = useForm<T>({ defaultValues });

	const { reset, watch } = form;
	const filters = watch();

	const savedFilters = localStorage.getItem(storageKey);

	const isFilterFormEmpty = useMemo(() => {
		return Object.values(filters).every(
			(value) => value === undefined || value === '' || value === null
		);
	}, [filters])

	// Carregar filtros salvos do localStorage
	useEffect(() => {
		if (savedFilters) {
			reset(JSON.parse(savedFilters));
		}
	}, [reset, storageKey]);

	// Salvar ou remover filtros no localStorage
	useEffect(() => {
		if (!isSaved && savedFilters) {
			localStorage.removeItem(storageKey);
		}

		if (isSaved) {
			const filtersToSave = isFilterFormEmpty && savedFilters ? savedFilters : JSON.stringify(filters);
			localStorage.setItem(storageKey, filtersToSave);
		}
	}, [isSaved, filters, storageKey, isFilterFormEmpty]);

	const toggleSave = () => setIsSaved((prev) => !prev);

	return { form, isSaved, toggleSave };
};
