import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from '@mui/material';

import { useForm } from 'react-hook-form';

import Autocomplete from '@/components/ui/Autocomplete/Autocomplete';
import Badge from '@/components/ui/Badge/Badge';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import DateField from '@/components/ui/DateField/DateField';
import TextInput from '@/components/ui/Input/TextInput';
import Radio from '@/components/ui/Radio/Radio';
import Select from '@/components/ui/Select/Select';
import Switch from '@/components/ui/Switch/Switch';
import Textarea from '@/components/ui/Textarea/Textarea';

import { FormValues } from './@types';

export const FormControlled = () => {
	const { control, handleSubmit } = useForm<FormValues>();

	const onSubmit = (data: FormValues) => {
		// eslint-disable-next-line no-console
		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid grid-cols-1 gap-20"
		>
			<Badge
				name="notificationsAlert"
				defaultValue={2}
				showZero
			>
				<IconButton>
					<NotificationsIcon />
				</IconButton>
			</Badge>
			<Switch.ControlledSwitch
				name="notifications"
				label="Receber notificações"
				control={control}
			/>
			<DateField.ControlledDateField
				control={control}
				label="Data"
				name="date"
			/>
			<Textarea.ControlledTextarea
				name="comments"
				label="Comentários"
				control={control}
				rows={4}
			/>
			<Checkbox.ControlledCheckbox
				name="terms"
				label="Aceito os termos"
				control={control}
			/>
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
				label="Cidade"
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
