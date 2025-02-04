/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button/Button';
import TextInput from '@/components/ui/Input/TextInput';

export interface FormFieldProps {
	name: string;
}

export interface FormProps {
	fields: Array<FormFieldProps>;
	defaultValues: Record<string, any>;
	showBackButton?: boolean;
	onSubmit(values: Record<string, any>): void;
	onBack(values: Record<string, any>): void;
}

const Form: React.FC<Readonly<FormProps>> = (props) => {
	const { fields, defaultValues, onSubmit } = props;
	const { showBackButton, onBack } = props;

	const formInstance = useForm({
		defaultValues: useMemo(() => defaultValues, [defaultValues]),
	});
	const { handleSubmit, register, reset } = formInstance;

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues]);

	const handleBack = () => {
		const values = formInstance.getValues();
		onBack(values);
	};

	return (
		<FormProvider {...formInstance}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid gap-10"
			>
				{fields.map(({ name }) => (
					<TextInput.UncontrolledInput
						key={name}
						placeholder={name}
						label={name}
						{...register(name)}
					/>
				))}
				<div className="flex justify-between">
					{showBackButton && (
						<Button
							variant="outline"
							onClick={handleBack}
						>
							Voltar
						</Button>
					)}
					<Button
						variant="primary"
						type="submit"
					>
						Enviar
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};

export default Form;
