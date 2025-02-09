import ExampleWrapper from '@/components/app/ExampleWrapper';
import { FormControlled } from '@/features/Forms/FormControlled';
import { FormUncontrolled } from '@/features/Forms/FormUncontrolled';
import { RHF_Form } from '@/features/Forms/RHF_Form';

const Components = () => {
	return (
		<ExampleWrapper>
			<div className="mx-auto mt-10 grid h-screen w-[800px] grid-cols-3 gap-20">
				<div className="h-fit space-y-20 rounded-md border-2 border-orange-100 bg-orange-200/10 p-10">
					<h2 className="text-lg">React Hook Form</h2>
					<RHF_Form />
				</div>
				<div className="h-fit space-y-20 rounded-md border-2 border-blue-100 bg-blue-200/10 p-10">
					<h2 className="text-lg">Controlled</h2>
					<FormControlled />
				</div>

				<div className="h-fit space-y-20 rounded-md border-2 border-green-100 bg-green-200/10 p-10">
					<h2 className="text-lg">Uncontrolled</h2>
					<FormUncontrolled />
				</div>
			</div>
		</ExampleWrapper>
	);
};

export default Components;
