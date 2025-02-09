import { Switch as MUISwitch, FormControlLabel } from '@mui/material';

import { Controller, FieldValues, Path, UseControllerProps } from 'react-hook-form';

type BaseProps = {
	name: string;
	label?: string;
	disabled?: boolean;
	value?: boolean;
};

type ControlledSwitchProps<T extends FieldValues> = BaseProps & {
	control: UseControllerProps<T>['control'];
	name: Path<T>;
};

const ControlledSwitch = <T extends FieldValues>({ name, label, control, disabled }: ControlledSwitchProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<FormControlLabel
					control={
						<MUISwitch
							{...field}
							checked={field.value ?? false}
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

type UncontrolledSwitchProps = BaseProps & {
	defaultChecked?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UncontrolledSwitch = ({ name, label, defaultChecked, onChange, disabled }: UncontrolledSwitchProps) => {
	return (
		<FormControlLabel
			control={
				<MUISwitch
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
	ControlledSwitch,
	UncontrolledSwitch,
};
