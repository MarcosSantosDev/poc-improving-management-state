import { TextField } from '@mui/material';

import { Controller, FieldValues, Path, UseControllerProps } from 'react-hook-form';

type BaseProps = {
	name: string;
	label?: string;
	placeholder?: string;
	rows?: number;
	disabled?: boolean;
	fullWidth?: boolean;
};

// Componente para Textarea Controlado (Controlled)
type ControlledTextareaProps<T extends FieldValues> = BaseProps & {
	control: UseControllerProps<T>['control'];
	name: Path<T>;
};

const ControlledTextarea = <T extends FieldValues>({ name, label, control, ...props }: ControlledTextareaProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<TextField
					{...field}
					value={field.value || ''}
					label={label}
					multiline
					{...props}
				/>
			)}
		/>
	);
};

type UncontrolledTextareaProps = BaseProps & {
	defaultValue?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UncontrolledTextarea = ({ name, label, defaultValue, onChange, ...props }: UncontrolledTextareaProps) => {
	return (
		<TextField
			name={name}
			label={label}
			defaultValue={defaultValue}
			onChange={onChange}
			multiline
			{...props}
		/>
	);
};

export default {
	ControlledTextarea,
	UncontrolledTextarea,
};
