import { Badge as MUIBadge, BadgeProps } from '@mui/material';

type BaseProps = {
	name: string;
	defaultValue?: number | string;
	children: React.ReactNode;
} & Omit<BadgeProps, 'badgeContent'>;

const Badge = ({ children, defaultValue, ...props }: BaseProps) => {
	return (
		<MUIBadge
			{...props}
			badgeContent={defaultValue}
			color="primary"
			classes={{
				root: 'w-fit',
			}}
		>
			{children}
		</MUIBadge>
	);
};

export default Badge;
