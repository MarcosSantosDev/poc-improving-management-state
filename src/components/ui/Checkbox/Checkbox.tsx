import * as React from 'react';

import { Checkbox as MUICheckbox, FormControlLabel, CheckboxProps as MUICheckboxProps } from '@mui/material';

import { Controller, FieldValues, Path, UseControllerProps } from 'react-hook-form';

export const CheckboxBase = React.forwardRef<HTMLButtonElement, MUICheckboxProps>(({ ...props }, ref) => (
	<MUICheckbox
		{...props}
		ref={ref}
	/>
));

type BaseProps = MUICheckboxProps & {
	label?: string;
	disabled?: boolean;
};

type ControlledCheckboxProps<T extends FieldValues> = {
	control: UseControllerProps<T>['control'];
	name: Path<T>;
} & BaseProps;

const ControlledCheckbox = <T extends FieldValues>({ name, label, control, disabled }: ControlledCheckboxProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<FormControlLabel
					control={
						<CheckboxBase
							{...field}
							checked={field.value || false}
							onChange={(event) => field.onChange(event.target.checked)}
							disabled={disabled}
						/>
					}
					label={label}
				/>
			)}
		/>
	);
};

type UncontrolledCheckboxProps = BaseProps & {
	name?: string;
	defaultChecked?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UncontrolledCheckbox = ({ name, label, defaultChecked, onChange, disabled }: UncontrolledCheckboxProps) => {
	return (
		<FormControlLabel
			control={
				<CheckboxBase
					name={name}
					defaultChecked={defaultChecked}
					onChange={onChange}
					disabled={disabled}
				/>
			}
			label={label}
		/>
	);
};

export default {
	ControlledCheckbox,
	UncontrolledCheckbox,
};
