import * as React from 'react';

import {
	Autocomplete as MuiAutocomplete,
	TextField,
	FormControl,
	FormHelperText,
	type UseAutocompleteProps,
	type AutocompleteProps,
	CircularProgress,
} from '@mui/material';

import { Controller, FieldValues, Path, UseControllerProps } from 'react-hook-form';

export type Option = {
	label: string;
	value: string | number;
};

type ControlledProps<T extends FieldValues> = {
	control: UseControllerProps<T>['control'];
	name: Path<T>;
	rules?: UseControllerProps<T>['rules'];
};

type UncontrolledProps = {
	name: string;
	value?: Option | null;
	defaultValue?: Option | null;
	onChange?: (event: React.SyntheticEvent, value: Option | null) => void;
};

type CommonProps = {
	label: string;
	options: Option[];
	helperText?: string;
	error?: boolean;
	/**
	 * If true, the component is shown.
	 */
	open?: UseAutocompleteProps<Option, false, false, false>['open'];
	/**
	 * Callback fired when the popup requests to be opened. Use in controlled mode (see open).
	 */
	onOpen?: UseAutocompleteProps<Option, false, false, false>['onOpen'];
	/**
	 * Callback fired when the popup requests to be closed. Use in controlled mode (see open).
	 */
	onClose?: UseAutocompleteProps<Option, false, false, false>['onClose'];
	/**
	 * If true, the component is in a loading state. This shows the loadingText in place of suggestions (only if there are no suggestions to show, for example options are empty).
	 */
	loading?: AutocompleteProps<Option, false, false, false, 'div'>['loading'];
	/**
	 * Callback fired when the input value changes.
	 */
	onInputChange?: UseAutocompleteProps<Option, false, false, false>['onInputChange'];
};

type ControlledAutocompleteProps<T extends FieldValues> = CommonProps & ControlledProps<T>;

const ControlledAutocomplete = <T extends FieldValues>({
	label,
	options,
	helperText,
	error,
	name,
	control,
	rules,
	...props
}: ControlledAutocompleteProps<T>) => {
	return (
		<FormControl
			fullWidth
			error={error}
		>
			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({ field }) => (
					<MuiAutocomplete
						{...field}
						open={props?.open}
						onOpen={props?.onOpen}
						onClose={props?.onClose}
						loading={props?.loading}
						onInputChange={props?.onInputChange}
						options={options}
						getOptionLabel={(option) => option.label}
						isOptionEqualToValue={(option, value) => option.value === value.value}
						renderInput={(params) => (
							<TextField
								{...params}
								label={label}
								error={error}
								slotProps={{
									input: {
										...params.InputProps,
										endAdornment: (
											<React.Fragment>
												{props?.loading ? (
													<CircularProgress
														color="inherit"
														size={20}
													/>
												) : null}
												{params.InputProps.endAdornment}
											</React.Fragment>
										),
									},
								}}
							/>
						)}
						// called after selecting a new option
						onChange={(_, value) => {
							field.onChange(value);
						}}
						value={field.value || null}
					/>
				)}
			/>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

type UncontrolledAutocompleteProps = CommonProps & UncontrolledProps;

const UncontrolledAutocomplete = ({
	label,
	options,
	helperText,
	error,
	defaultValue = null,
	value,
	name,
	onChange,
}: UncontrolledAutocompleteProps) => {
	return (
		<FormControl
			fullWidth
			error={error}
		>
			<MuiAutocomplete
				options={options}
				getOptionLabel={(option) => option.label}
				isOptionEqualToValue={(option, value) => option.value === value.value}
				renderInput={(params) => (
					<TextField
						{...params}
						name={name}
						label={label}
						error={error}
					/>
				)}
				onChange={onChange}
				value={value}
				defaultValue={defaultValue}
			/>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

export default {
	ControlledAutocomplete,
	UncontrolledAutocomplete,
};
