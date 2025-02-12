import * as React from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from '@mui/material';

import Autocomplete from '@/components/ui/Autocomplete/Autocomplete';
import Badge from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import Chip from '@/components/ui/Chip/Chip';
import DateField from '@/components/ui/DateField/DateField';
import TextInput from '@/components/ui/Input/TextInput';
import MultiSelect from '@/components/ui/MultiSelect/MultiSelect';
import Radio from '@/components/ui/Radio/Radio';
import Select from '@/components/ui/Select/Select';
import Switch from '@/components/ui/Switch/Switch';
import Textarea from '@/components/ui/Textarea/Textarea';

import { FormValues } from './@types';

const initialForm: FormValues = {
	firstName: '',
	country: '',
	city: '',
	gender: '',
	terms: false,
	comments: '',
	date: '',
	notifications: false,
	notificationsAlert: 0,
	categories: [],
	chip1: false,
};

export const FormUncontrolled = () => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);

		const form = Object.fromEntries(Object.entries(initialForm).map(([key]) => [key, formData.get(key)]));
		// eslint-disable-next-line no-console
		console.log(form);
	};

	return (
		<form
			onSubmit={handleSubmit}
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
			<Switch.UncontrolledSwitch
				name="notifications"
				label="Receber notificações"
			/>
			<Chip.UncontrolledChip
				label="Clique Aqui"
				defaultSelected={false}
				onChange={(selected) => console.log('Selecionado:', selected)}
			/>
			<MultiSelect.UncontrolledMultiSelect
				name="categories"
				label="Categorias"
				options={[
					{ label: 'Tecnologia', value: 'tech' },
					{ label: 'Negócios', value: 'business' },
					{ label: 'Saúde', value: 'health' },
				]}
			/>
			<DateField.UncontrolledDateField
				label="Data"
				name="date"
			/>
			<Textarea.UncontrolledTextarea
				name="comments"
				label="Comentários"
				rows={4}
			/>
			<Checkbox.UncontrolledCheckbox
				name="terms"
				label="Aceito os termos"
			/>
			<Radio.UncontrolledRadio
				label="Gênero"
				name="gender"
				options={[
					{ label: 'Masculino', value: 'male' },
					{ label: 'Feminino', value: 'female' },
				]}
			/>
			<TextInput.UncontrolledInput
				label="Nome"
				name="firstName"
			/>
			<Select.UncontrolledSelect
				id="country"
				name="country"
				label="País"
				options={[
					{ value: 'us', label: 'United States' },
					{ value: 'ca', label: 'Canada' },
				]}
			/>
			<Autocomplete.UncontrolledAutocomplete
				label="Cidade"
				name="city"
				options={[
					{ value: 'option-01', label: 'Option 01' },
					{ value: 'option-02', label: 'Option 02' },
				]}
			/>
			<Button type="submit">Submit</Button>
		</form>
	);
};
