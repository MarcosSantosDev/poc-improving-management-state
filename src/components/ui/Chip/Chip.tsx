import * as React from 'react';

import { Chip as MuiChip } from '@mui/material';

import { Controller, FieldValues, Path, UseControllerProps } from 'react-hook-form';

type ControlledChipProps<T extends FieldValues> = {
	control: UseControllerProps<T>['control'];
	name: Path<T>;
	label: string;
};

const ControlledChip = <T extends FieldValues>({ name, label, control }: ControlledChipProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<MuiChip
					label={label}
					clickable
					color={field.value ? 'primary' : 'default'}
					onClick={() => field.onChange(!field.value)}
				/>
			)}
		/>
	);
};

type UncontrolledChipProps = {
	label: string;
	defaultSelected?: boolean;
	onChange?: (selected: boolean) => void;
};

const UncontrolledChip = ({ label, defaultSelected, onChange }: UncontrolledChipProps) => {
	const [selected, setSelected] = React.useState(defaultSelected || false);

	const handleChange = () => {
		setSelected((prev) => !prev);
		onChange?.(!selected);
	};

	return (
		<MuiChip
			label={label}
			clickable
			color={selected ? 'primary' : 'default'}
			onClick={handleChange}
		/>
	);
};

export default {
	ControlledChip,
	UncontrolledChip,
};
