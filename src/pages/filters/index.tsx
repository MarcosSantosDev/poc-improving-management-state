import ExampleWrapper from '@/components/app/ExampleWrapper';
import FilterWithUrlState from '@/features/Filters/FilterWithUrlState';

const Components = () => {
	return (
		<ExampleWrapper>
			<div className="mx-auto my-0 grid h-screen w-[800px] grid-cols-1 gap-20">
				<div className="space-y-20">
					<FilterWithUrlState />
				</div>
			</div>
		</ExampleWrapper>
	);
};

export default Components;
