import * as React from 'react';

import { Button as MUIButton, type ButtonProps as MUIButtonProps } from '@mui/material';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/twUtils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-8 whitespace-nowrap rounded-sm text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				primary: 'bg-primary-400 text-neutral-50 shadow hover:bg-primary-400/90',
				secondary: 'bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90',
				outline: 'border border-neutral-200 bg-white hover:bg-neutral-50 hover:text-neutral-900',
				destructive: 'bg-red-500 text-neutral-50 hover:bg-red-500/90',
				ghost: 'bg-gray-100 hover:bg-gray-200 text-neutral-900',
				link: 'text-neutral-900 underline-offset-4 hover:underline',
			},
			size: {
				md: 'h-40 px-3',
				lg: 'h-48 px-8',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
		},
	}
);

export type ButtonProps = Omit<MUIButtonProps, 'variant'> & VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant = 'primary', size, className, children, ...props }, ref) => {
		return (
			<MUIButton
				{...props}
				ref={ref}
				className={cn(buttonVariants({ variant, size, className }))}
			>
				{children}
			</MUIButton>
		);
	}
);

Button.displayName = 'Button';

export { Button, buttonVariants };
