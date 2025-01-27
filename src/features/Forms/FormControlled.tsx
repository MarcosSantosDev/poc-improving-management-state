import { useForm } from 'react-hook-form';

import Select from '@/components/ui/Select/Select';

type FormValues = {
	country: string;
	city: string;
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
			<button
				className="border-1 w-full rounded-sm border border-black p-10"
				type="submit"
			>
				Submit
			</button>
		</form>
	);
};
