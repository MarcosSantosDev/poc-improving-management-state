/* eslint-disable no-console */
import { zodResolver } from '@hookform/resolvers/zod';
import { Stepper, Step, StepLabel, Container } from '@mui/material';

import clsx from 'clsx';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button/Button';
import TextInput from '@/components/ui/Input/TextInput';

import { useMultiStepForm } from './useMultiStepForm';

const multiStepFormValidationSchemas = z.object({
	firstName: z.string({
		required_error: 'Nome é obrigatório',
	}),
	lastName: z.string({
		required_error: 'Sobrenome é obrigatório',
	}),
	address: z.string({
		required_error: 'Endereço é obrigatório',
	}),
	city: z.string({
		required_error: 'Cidade é obrigatório',
	}),
});

const steps = ['Dados Pessoais', 'Endereço', 'Confirmação'];
const stepsValidationSchemas = [
	multiStepFormValidationSchemas.pick({ firstName: true, lastName: true }),
	multiStepFormValidationSchemas.pick({ address: true, city: true }),
	z.object({}),
];

const PersonalDataForm = () => {
	const {
		control,
		register,
		formState: { errors },
	} = useFormContext<{
		firstName: string;
		lastName: string;
	}>();
	return (
		<>
			<input
				type="text"
				{...register('firstName')}
			/>
			{/* <TextInput.ControlledInput
				label="Nome"
				error={!!errors.firstName}
				helperText={errors.firstName?.message}
				control={control}
				name="firstName"
			/> */}
			<TextInput.UncontrolledInput
				label="Sobrenome"
				error={!!errors.lastName}
				helperText={errors.lastName?.message}
				{...register('lastName')}
			/>
		</>
	);
};

const AddressForm = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<{
		address: string;
		city: string;
	}>();
	return (
		<>
			<TextInput.UncontrolledInput
				label="Endereço"
				error={!!errors.address}
				helperText={errors.address?.message}
				{...register('address')}
			/>
			<TextInput.UncontrolledInput
				label="Cidade"
				error={!!errors.city}
				helperText={errors.city?.message}
				{...register('city')}
			/>
		</>
	);
};

const ConfirmationStep = () => <p>Revise seus dados antes de enviar.</p>;

type FormFields = z.infer<typeof multiStepFormValidationSchemas>;

const MultiStepForm = () => {
	const { currentStepIndex, step, nextStep, previousStep } = useMultiStepForm([
		<PersonalDataForm key={0} />,
		<AddressForm key={1} />,
		<ConfirmationStep key={2} />,
	]);

	const methods = useForm<FormFields>({
		resolver: zodResolver(stepsValidationSchemas[currentStepIndex]),
		mode: 'onBlur',
		defaultValues: {
			firstName: '',
			lastName: '',
			address: '',
			city: '',
		},
	});

	const onSubmit = (data: FormFields) => {
		console.log('Dados do Formulário:', data);
		console.log('Dados do Formulário 2:', methods.getValues());
	};

	return (
		<Container maxWidth="sm">
			<Stepper
				activeStep={currentStepIndex}
				sx={{ my: 3 }}
			>
				{steps.map((label, index) => (
					<Step key={index}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>

			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className="grid gap-10"
				>
					{step}
					<div className="flex justify-between">
						<Button
							type="button"
							variant="outline"
							onClick={previousStep}
							className={clsx({
								hidden: currentStepIndex === 0,
							})}
						>
							Voltar
						</Button>
						<Button
							variant="primary"
							type="submit"
							className={clsx({
								hidden: steps.length - 1 !== currentStepIndex,
							})}
						>
							Enviar
						</Button>

						<Button
							type="button"
							variant="primary"
							onClick={nextStep}
							className={clsx({
								hidden: steps.length - 1 === currentStepIndex,
							})}
						>
							Próximo
						</Button>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
};

export default MultiStepForm;
