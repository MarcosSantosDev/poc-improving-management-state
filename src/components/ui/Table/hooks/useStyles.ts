import { makeStyles } from '@mui/styles';

// Styling of Table
export const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		'& .pagination-wrapper': {
			display: 'flex',
			justifyContent: 'center',
			'@media (max-width: 600px)': {
				order: '2',
				marginTop: '20px',
				marginBottom: '10px',
			},
		},
		'& .paging-wrapper': {
			display: 'flex',
			justifyContent: 'center',
			marginTop: '20px',
		},
		'& .MuiFormControl-root': {
			backgroundColor: '#F3F1EF',
			color: '#231B15',
			'& .MuiInputBase-root:after': {
				border: '0 !important',
			},
			'& .MuiInputBase-root:before': {
				border: '0 !important',
			},
			'& input': {
				color: '#231B15',
				padding: '18px',
				border: '0',
			},
			'&:after': {
				borderBottom: '0',
			},
		},
		'& .nowrap': {
			whiteSpace: 'nowrap',
		},
	},
	table: {
		'& .MuiTableCell-root': {
			overflow: 'hidden',
			fontSize: '14px',
			overflowWrap: 'anywhere',
		},
		'& .Mui-active': {
			fontWeight: '600',
		},
		'& .MuiTableCell-head': {
			color: 'inherit',
			fontWeight: '500',
		},
		'& .nowrap': {
			whiteSpace: 'nowrap',
		},
	},
}));
