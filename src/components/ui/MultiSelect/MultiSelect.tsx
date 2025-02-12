import * as React from 'react';

import { FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { Controller, FieldValues, Path, PathValue, UseControllerProps } from 'react-hook-form';

import { CheckboxBase } from '../Checkbox/Checkbox';

type MultiSelectProps = {
	name: string;
	label: string;
	options: { label: string; value: string }[];
	required?: boolean;
	disabled?: boolean;
};

type ControlledMultiSelectProps<T extends FieldValues> = MultiSelectProps & {
	control: UseControllerProps<T>['control'];
	name: Path<T>;
	rules?: UseControllerProps<T>['rules'];
	defaultValue?: PathValue<T, Path<T>>;
};

const ControlledMultiSelect = <T extends FieldValues>({
	name,
	label,
	options,
	control,
	defaultValue,
	required = false,
	disabled = false,
}: ControlledMultiSelectProps<T>) => (
	<Controller
		name={name}
		control={control}
		defaultValue={defaultValue}
		render={({ field }) => (
			<FormControl
				fullWidth
				required={required}
				disabled={disabled}
			>
				<InputLabel>{label}</InputLabel>
				<Select
					multiple
					value={field.value ?? []}
					onChange={(event) => field.onChange(event)}
					renderValue={(selected) => selected.join(', ')}
				>
					{options.map((option) => (
						<MenuItem
							key={option.value}
							value={option.value}
						>
							<CheckboxBase checked={(field.value ?? []).includes(option.value as never)} />
							<ListItemText primary={option.label} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		)}
	/>
);

type UncontrolledMultiSelectProps = MultiSelectProps & {
	value?: string[];
	onChange?: (value: SelectChangeEvent<string[]>) => void;
};

const UncontrolledMultiSelect = ({
	name,
	label,
	options,
	required = false,
	disabled = false,
	...props
}: UncontrolledMultiSelectProps) => {
	const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

	return (
		<FormControl
			fullWidth
			required={required}
			disabled={disabled}
		>
			<InputLabel>{label}</InputLabel>
			<Select
				multiple
				name={name}
				renderValue={(selected) => selected.join(', ')}
				value={selectedValues}
				onChange={(event) => {
					const value = event.target.value;
					if (Array.isArray(value)) {
						setSelectedValues(value);
					} else {
						setSelectedValues([value]);
					}
				}}
				{...props}
			>
				{options.map((option) => (
					<MenuItem
						key={option.value}
						value={option.value}
					>
						<CheckboxBase checked={selectedValues.includes(option.value)} />
						<ListItemText primary={option.label} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default {
	ControlledMultiSelect,
	UncontrolledMultiSelect,
};
