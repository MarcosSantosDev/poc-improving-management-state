import { create } from 'zustand';

type PaginationState = {
	skip: number;
	take: number;
	totalItems: number;
	currentPage: number;
	setPage: (page: number) => void;
	setTotalItems: (total: number) => void;
};

const usePaginationStore = create<PaginationState>((set) => ({
	skip: 0,
	take: 10,
	totalItems: 0,
	currentPage: 1,
	setPage: (page) =>
		set((state) => ({
			currentPage: page,
			skip: (page - 1) * state.take,
		})),
	setTotalItems: (total) => set({ totalItems: total }),
}));

export const usePagination = () => {
	const { skip, take, totalItems, currentPage, setPage, setTotalItems } = usePaginationStore();

	const totalPages = Math.ceil(totalItems / take);

	return {
		skip,
		take,
		totalItems,
		currentPage,
		totalPages,
		setPage,
		setTotalItems,
	};
};
