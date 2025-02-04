import React from 'react';

import { TextField, FormControl, FormHelperText } from '@mui/material';

import { Controller, FieldError, FieldErrorsImpl, FieldValues, Merge, Path, UseControllerProps } from 'react-hook-form';

type ControlledProps<T extends FieldValues> = {
	control: UseControllerProps<T>['control'];
	name: Path<T>;
	rules?: UseControllerProps<T>['rules'];
	helperText?: string | FieldError | Merge<FieldError, FieldErrorsImpl<T>>;
};

type UncontrolledProps = {
	value?: string;
	defaultValue?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	helperText?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

// Props comuns para ambos os componentes
type CommonProps = {
	name: string;
	label: string;
	type?: string;
	placeholder?: string;
	disabled?: boolean;
	error?: boolean;
	fullWidth?: boolean;
	value?: string;
	ref?: React.Ref<HTMLInputElement>;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const ControlledInput = <T extends FieldValues>({
	control,
	rules,
	helperText,
	error,
	fullWidth = true,
	label,
	...props
}: ControlledProps<T> & CommonProps) => {
	return (
		<FormControl
			fullWidth={fullWidth}
			error={error}
		>
			<Controller
				{...props}
				control={control}
				rules={rules}
				render={({ field }) => (
					<TextField
						{...field}
						inputRef={field.ref}
						type="text"
						error={error}
						label={label}
						value={field.value || ''}
					/>
				)}
			/>
			{typeof helperText === 'string' && helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

const UncontrolledInput = React.forwardRef<HTMLInputElement, UncontrolledProps & CommonProps>(
	({ helperText, error, fullWidth = true, ...props }, ref) => {
		return (
			<FormControl
				fullWidth={fullWidth}
				error={error}
			>
				<TextField
					{...props}
					type="text"
					inputRef={ref}
				/>
				{typeof helperText === 'string' && helperText && <FormHelperText>{helperText}</FormHelperText>}
			</FormControl>
		);
	}
);

export default { ControlledInput, UncontrolledInput };
