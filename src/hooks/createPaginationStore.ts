import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PaginationState = {
	currentPage: number;
	itemsPerPage: number;
	totalItems: number;

	take: () => number;
	skip: () => number;
	totalPages: () => number;

	setTotalItems: (total: number) => void;
	goToPage: (page: number) => void;
	nextPage: () => void;
	prevPage: () => void;
};

// Cria um hook de estado para lidar com paginação
export const createPaginationStore = (localStorageKey: string) =>
	create<PaginationState>()(
		persist(
			(set, get) => ({
				// Estado
				currentPage: 1,
				itemsPerPage: 10,
				totalItems: 0,

				// Valores computados
				take: () => get().itemsPerPage,
				skip: () => (get().currentPage - 1) * get().itemsPerPage,
				totalPages: () => Math.ceil(get().totalItems / get().itemsPerPage),

				// Ações
				setTotalItems: (total: number) => set({ totalItems: total }),
				goToPage: (page: number) => {
					const totalPages = get().totalPages();
					if (page >= 1 && page <= totalPages) {
						set({ currentPage: page });
					}
				},
				nextPage: () => {
					const totalPages = get().totalPages();
					const currentPage = get().currentPage;
					if (currentPage < totalPages) {
						set({ currentPage: currentPage + 1 });
					}
				},
				prevPage: () => {
					const currentPage = get().currentPage;
					if (currentPage > 1) {
						set({ currentPage: currentPage - 1 });
					}
				},
			}),
			{
				// Define o nome da chave no localStorage
				name: localStorageKey,
				// Define quais partes do estado salvar
				partialize: (state) => ({
					currentPage: state.currentPage,
					totalItems: state.totalItems,
					itemsPerPage: state.itemsPerPage,
				}),
			}
		)
	);
