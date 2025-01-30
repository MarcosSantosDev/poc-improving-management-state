import ExampleWrapper from '@/components/app/ExampleWrapper';
import { FormControlled } from '@/features/Forms/FormControlled';
import { FormUncontrolled } from '@/features/Forms/FormUncontrolled';

const Components = () => {
	return (
		<ExampleWrapper>
			<div className="mx-auto mt-10 grid h-screen w-[800px] grid-cols-2 gap-20">
				<div className="space-y-20">
					<h2 className="text-lg">Controlled</h2>
					<FormControlled />
				</div>

				<div className="space-y-20">
					<h2 className="text-lg">Uncontrolled</h2>
					<FormUncontrolled />
				</div>
			</div>
		</ExampleWrapper>
	);
};

export default Components;
