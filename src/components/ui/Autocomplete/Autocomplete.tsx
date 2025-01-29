import * as React from 'react';

import {
	Autocomplete as MuiAutocomplete,
	TextField,
	FormControl,
	FormHelperText,
	CircularProgress,
} from '@mui/material';

import { Controller, FieldValues, Path, UseControllerProps } from 'react-hook-form';

export type Option = {
	label: string;
	value: string | number;
};

type BaseProps = {
	/**
	 * Only for UncontrolledAutocomplete
	 */
	defaultValue?: Option | null;
	name?: string;
	label: string;
	options: Option[];
	helperText?: string;
	error?: boolean;
	loading?: boolean;
	open?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
	onInputChange?: (event: React.SyntheticEvent, value: string) => void;
};

type ControlledProps<T extends FieldValues> = BaseProps & {
	control: UseControllerProps<T>['control'];
	name: Path<T>;
	rules?: UseControllerProps<T>['rules'];
};

type UncontrolledProps = BaseProps & {
	name: string;
	value?: Option | null;
	defaultValue?: Option | null;
	onChange?: (event: React.SyntheticEvent, value: Option | null) => void;
};

const AutocompleteBase = ({
	label,
	options,
	helperText,
	error,
	loading,
	open,
	onOpen,
	onClose,
	onInputChange,
	...props
}: BaseProps & { value?: Option | null; onChange?: (event: React.SyntheticEvent, value: Option | null) => void }) => {
	return (
		<FormControl
			fullWidth
			error={error}
		>
			<MuiAutocomplete
				{...props}
				open={open}
				onOpen={onOpen}
				onClose={onClose}
				loading={loading}
				loadingText="Carregando..."
				onInputChange={onInputChange}
				options={options}
				getOptionLabel={(option) => option.label}
				isOptionEqualToValue={(option, value) => option.value === value.value}
				renderInput={(params) => (
					<TextField
						{...params}
						name={props.name}
						label={label}
						error={error}
						slotProps={{
							input: {
								...params.InputProps,
								endAdornment: (
									<>
										{loading ? (
											<CircularProgress
												color="inherit"
												size={20}
											/>
										) : null}
										{params.InputProps.endAdornment}
									</>
								),
							},
						}}
					/>
				)}
			/>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

const ControlledAutocomplete = <T extends FieldValues>({ control, name, rules, ...props }: ControlledProps<T>) => (
	<Controller
		name={name}
		control={control}
		rules={rules}
		render={({ field }) => (
			<AutocompleteBase
				{...props}
				value={field.value || null}
				onChange={(_, value) => field.onChange(value)}
			/>
		)}
	/>
);

const UncontrolledAutocomplete = ({ defaultValue = null, ...props }: UncontrolledProps) => (
	<AutocompleteBase
		{...props}
		defaultValue={defaultValue}
	/>
);

export default { ControlledAutocomplete, UncontrolledAutocomplete };
