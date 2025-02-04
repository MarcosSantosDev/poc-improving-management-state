import { useId } from 'react';

import { FormControl, FormControlLabel, FormHelperText, Radio as MuiRadio, RadioGroup } from '@mui/material';

import { Controller, FieldValues, Path, UseControllerProps } from 'react-hook-form';

type Option = {
	label: string;
	value: string;
};

type ControlledRadioProps<T extends FieldValues> = {
	control: UseControllerProps<T>['control'];
	name: Path<T>;
	options: Option[];
	label?: string;
	error?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
};

export const ControlledRadio = <T extends FieldValues>({
	name,
	options,
	label,
	error,
	control,
}: ControlledRadioProps<T>) => {
	const id = useId();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<FormControl
					error={!!error}
					component="fieldset"
				>
					{label && <FormHelperText>{label}</FormHelperText>}
					<RadioGroup
						{...field}
						value={field.value || ''}
						id={id}
					>
						{options.map((option) => (
							<FormControlLabel
								key={option.value}
								value={option.value}
								control={<MuiRadio />}
								label={option.label}
							/>
						))}
					</RadioGroup>
					{error && <FormHelperText>{error}</FormHelperText>}
				</FormControl>
			)}
		/>
	);
};

type UncontrolledRadioProps = {
	name: string;
	options: Option[];
	label?: string;
	error?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
};

export const UncontrolledRadio = ({
	name,
	options,
	label,
	error,
	value,
	defaultValue,
	onChange,
}: UncontrolledRadioProps) => {
	const id = useId();

	return (
		<FormControl
			error={!!error}
			component="fieldset"
		>
			{label && <FormHelperText>{label}</FormHelperText>}
			<RadioGroup
				id={id}
				name={name}
				value={value}
				defaultValue={defaultValue}
				onChange={(e) => onChange?.(e.target.value)}
			>
				{options.map((option) => (
					<FormControlLabel
						key={option.value}
						value={option.value}
						control={<MuiRadio />}
						label={option.label}
					/>
				))}
			</RadioGroup>
			{error && <FormHelperText>{error}</FormHelperText>}
		</FormControl>
	);
};

export default {
	ControlledRadio,
	UncontrolledRadio,
};
