import { FormControlled } from '@/features/Forms/FormControlled';
import { FormUncontrolled } from '@/features/Forms/FormUncontrolled';

const Components = () => {
	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<h1 className="mb-6 text-3xl font-bold">Forms</h1>

			<div className="mx-auto my-0 grid h-screen w-[800px] grid-cols-2 gap-20">
				<div className="space-y-20">
					<h2 className="text-lg">Controlled</h2>
					<FormControlled />
				</div>

				<div className="space-y-20">
					<h2 className="text-lg">Uncontrolled</h2>
					<FormUncontrolled />
				</div>
			</div>
		</div>
	);
};

export default Components;
