import * as React from 'react';

import { MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';

import { Controller, FieldValues, Path, PathValue, UseControllerProps } from 'react-hook-form';

type BaseSelectProps = {
	error?: boolean;
	helperText?: string;
	id: string;
	name: string;
	label: string;
	options: { value: string | number; label: string }[];
	defaultValue?: string;
};

type SelectProps<T extends FieldValues> = BaseSelectProps & {
	control: UseControllerProps<T>['control'];
	name: Path<T>;
	rules?: UseControllerProps<T>['rules'];
	defaultValue?: PathValue<T, Path<T>>;
};

const ControlledSelect = <T extends FieldValues>({
	error,
	helperText,
	control,
	name,
	rules,
	label,
	options,
	// @ts-expect-error reports an error because a link is required between the component and the react-hook-form
	defaultValue = '',
}: SelectProps<T>) => {
	const selectId = React.useId();

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue={defaultValue}
			render={({ field }) => (
				<FormControl
					fullWidth
					error={error}
				>
					<InputLabel id={selectId}>{label}</InputLabel>
					<Select
						labelId={selectId}
						{...field}
						label={label}
						error={error}
					>
						{options.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}
							>
								{option.label}
							</MenuItem>
						))}
					</Select>
					{helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
				</FormControl>
			)}
		/>
	);
};

const UncontrolledSelect = React.forwardRef<HTMLSelectElement, BaseSelectProps>(
	({ error, helperText, options, defaultValue = '', label, ...props }, ref) => {
		const selectId = React.useId();

		return (
			<FormControl
				fullWidth
				error={error}
			>
				<InputLabel id={selectId}>{label}</InputLabel>
				<Select
					{...props}
					labelId={selectId}
					label={label}
					error={error}
					defaultValue={defaultValue}
					ref={ref}
				>
					{options.map((option) => (
						<MenuItem
							key={option.value}
							value={option.value}
						>
							{option.label}
						</MenuItem>
					))}
				</Select>
				{helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
			</FormControl>
		);
	}
);

export default {
	ControlledSelect,
	UncontrolledSelect,
};
