import ExampleWrapper from '@/components/app/ExampleWrapper';
// import FormWizard, { FormWizardStepProps } from '@/features/FormWizard/FormWizard';
import MultiStepForm from '@/features/MultiStepForm/MultiStepForm';

// const steps: FormWizardStepProps[] = [
// 	{ id: 'STEP_1', fields: [{ name: 'FIRSTNAME' }, { name: 'LASTNAME' }] },
// 	{ id: 'STEP_2', fields: [{ name: 'COUNTRY' }, { name: 'ADDRESS' }] },
// ];
// const defaultValues = { COUNTRY: 'Estonia' };

const Components = () => {
	return (
		<ExampleWrapper>
			<div className="mx-auto my-0 grid h-screen w-[800px] grid-cols-1 gap-20">
				<div className="space-y-20">
					<MultiStepForm />
					{/* <FormWizard
						steps={steps}
						defaultValues={defaultValues}
						onSubmit={(values: Record<string, any>) => {
							console.log(values);
						}}
					/> */}
				</div>
			</div>
		</ExampleWrapper>
	);
};

export default Components;
