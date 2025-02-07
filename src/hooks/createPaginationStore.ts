import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PaginationState = {
	page: number;
	pageSize: number;
	totalItems: number;
	skip: number;
	take: number;
	totalPages: number;
	orderByColumn: string | null;
	order: 'asc' | 'desc';
	orderByAsc: boolean;

	setPage: (page: number) => void;
	setPageSize: (pageSize: number) => void;
	setTotalItems: (totalItems: number) => void;
	nextPage: () => void;
	previousPage: () => void;
	setOrderBy: (column: string) => void;
	toggleOrder: (orderByColumn: string) => void;
	resetPagination: () => void;
};

export type CreatePaginationStore = typeof createPaginationStore;

// Cria o hook para lidar com paginação
export const createPaginationStore = (localStorageKey: string) =>
	create<PaginationState>()(
		persist(
			(set, get) => ({
				// Estado
				page: 1,
				pageSize: 10,
				totalItems: 0,
				skip: 0,
				take: 10,
				totalPages: 1,
				orderByColumn: 'updatedAt',
				order: 'asc',
				orderByAsc: false,

				// Ações
				setPage: (page) => {
					const totalPages = Math.ceil(get().totalItems / get().pageSize);
					const validPage = Math.min(Math.max(1, page), totalPages);
					set({
						page: validPage,
						skip: (validPage - 1) * get().pageSize,
						take: get().pageSize,
					});
				},
				setPageSize: (pageSize) => {
					const totalPages = Math.ceil(get().totalItems / pageSize);
					set({
						pageSize,
						page: 1, // Retorna para primeira pagina ao mudar o tamanho da paginação
						skip: 0,
						take: pageSize,
						totalPages,
					});
				},
				setTotalItems: (totalItems) => {
					const totalPages = Math.ceil(totalItems / get().pageSize);
					set({ totalItems, totalPages });
				},
				nextPage: () => {
					const { page, totalPages, pageSize } = get();
					const nextPage = Math.min(page + 1, totalPages);
					set({
						page: nextPage,
						skip: (nextPage - 1) * pageSize,
						take: pageSize,
					});
				},
				previousPage: () => {
					const { page, pageSize } = get();
					const previousPage = Math.max(page - 1, 1);
					set({
						page: previousPage,
						skip: (previousPage - 1) * pageSize,
						take: pageSize,
					});
				},
				setOrderBy: (column) => set({ orderByColumn: column }),
				toggleOrder: (orderByColumn) =>
					set((state) => {
						const order = state.order === 'asc' ? 'desc' : 'asc';
						return {
							orderByColumn,
							order,
							orderByAsc: order === 'asc',
						};
					}),
				resetPagination: () =>
					set({
						page: 1,
						pageSize: 10,
						skip: 0,
						take: 10,
						totalPages: Math.ceil(get().totalItems / 10),
						orderByColumn: 'updatedAt',
						order: 'asc',
						orderByAsc: false,
					}),
			}),
			{
				// Define o nome da chave no localStorage
				name: localStorageKey,
				// Define quais partes do estado salvar
				partialize: (state) => ({
					page: state.page,
					pageSize: state.pageSize,
					totalItems: state.totalItems,
					skip: state.skip,
					take: state.take,
					totalPages: state.totalPages,
					orderByColumn: state.orderByColumn,
					order: state.order,
				}),
			}
		)
	);
