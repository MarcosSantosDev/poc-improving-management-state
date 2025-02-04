import { useForm } from 'react-hook-form';

import Autocomplete from '@/components/ui/Autocomplete/Autocomplete';
import TextInput from '@/components/ui/Input/TextInput';
import Radio from '@/components/ui/Radio/Radio';
import Select from '@/components/ui/Select/Select';

type FormValues = {
	firstName: string;
	country: string;
	city: string;
	gender: string;
};

export const FormControlled = () => {
	const { control, handleSubmit } = useForm<FormValues>();

	const onSubmit = (data: FormValues) => {
		// eslint-disable-next-line no-console
		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-20"
		>
			<Radio.ControlledRadio
				control={control}
				label="Gênero"
				name="gender"
				options={[
					{ label: 'Masculino', value: 'male' },
					{ label: 'Feminino', value: 'female' },
				]}
			/>
			<TextInput.ControlledInput
				control={control}
				label="Nome"
				name="firstName"
			/>
			<Select.ControlledSelect
				control={control}
				id="country"
				name="country"
				label="País"
				options={[
					{ value: 'us', label: 'United States' },
					{ value: 'ca', label: 'Canada' },
				]}
			/>
			<Autocomplete.ControlledAutocomplete
				control={control}
				name="city"
				label="City"
				onInputChange={(_event, state) => {
					// eslint-disable-next-line no-console
					console.log('Input changed', state);
				}}
				options={[
					{ value: 'option-01', label: 'Option 01' },
					{ value: 'option-02', label: 'Option 02' },
				]}
			/>
			<button
				className="border-1 w-full rounded-sm border border-black p-10"
				type="submit"
			>
				Submit
			</button>
		</form>
	);
};
