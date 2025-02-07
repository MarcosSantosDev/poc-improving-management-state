import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Controller, FieldValues, Path, UseControllerProps } from 'react-hook-form';

type BaseProps = {
	name: string;
	label?: string;
	disabled?: boolean;
	fullWidth?: boolean;
};

type ControlledDateFieldProps<T extends FieldValues> = BaseProps & {
	control: UseControllerProps<T>['control'];
	name: Path<T>;
};

const ControlledDateField = <T extends FieldValues>({
	name,
	label,
	control,
	...props
}: ControlledDateFieldProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<DatePicker
					{...field}
					{...props}
					label={label}
					value={field.value ? new Date(field.value) : null}
					format="dd/MM/yyyy"
					onChange={(date) => field.onChange(date ? date.toISOString() : null)}
				/>
			)}
		/>
	);
};

type UncontrolledDateFieldProps = BaseProps & {
	defaultValue?: Date | null;
	onChange?: (date: string | null) => void;
};

const UncontrolledDateField = ({ defaultValue, onChange, ...props }: UncontrolledDateFieldProps) => {
	return (
		<DatePicker
			value={defaultValue ?? null}
			format="dd/MM/yyyy"
			onChange={(date) => onChange?.(date ? date.toISOString() : null)}
			{...props}
		/>
	);
};

export default {
	ControlledDateField,
	UncontrolledDateField,
};
