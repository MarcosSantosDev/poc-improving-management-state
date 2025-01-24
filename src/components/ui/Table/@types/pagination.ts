export type SortDir = false | 'asc' | 'desc';

export type Sort = {
	sortKey: string;
	sortDir: SortDir;
};
