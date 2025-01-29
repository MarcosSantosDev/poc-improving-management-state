import Autocomplete from '@/components/ui/Autocomplete/Autocomplete';
import Select from '@/components/ui/Select/Select';
const initialForm = {
	country: '',
	city: '',
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
			className="space-y-20"
		>
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
				label="City"
				name="city"
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
