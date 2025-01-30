import React from 'react';

import { TextField, FormControl, FormHelperText } from '@mui/material';

import { Controller, FieldValues, Path, UseControllerProps } from 'react-hook-form';

type ControlledProps<T extends FieldValues> = {
	control: UseControllerProps<T>['control'];
	name: Path<T>;
	rules?: UseControllerProps<T>['rules'];
};

type UncontrolledProps = {
	value?: string;
	defaultValue?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// Props comuns para ambos os componentes
type CommonProps = {
	label: string;
	type?: string;
	placeholder?: string;
	helperText?: string;
	error?: boolean;
	fullWidth?: boolean;
	ref: React.Ref<HTMLInputElement>;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const ControlledInput = <T extends FieldValues>({
	control,
	rules,
	helperText,
	error,
	fullWidth = true,
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
						type="text"
						error={error}
					/>
				)}
			/>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
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
				{helperText && <FormHelperText>{helperText}</FormHelperText>}
			</FormControl>
		);
	}
);

export default { ControlledInput, UncontrolledInput };
