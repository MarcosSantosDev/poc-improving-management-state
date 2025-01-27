import Select from '@/components/ui/Select/Select';

export const FormUncontrolled = () => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		// eslint-disable-next-line no-console
		console.log('Selected Value:', formData.get('country'));
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
			<button
				className="border-1 w-full rounded-sm border border-black p-10"
				type="submit"
			>
				Submit
			</button>
		</form>
	);
};
