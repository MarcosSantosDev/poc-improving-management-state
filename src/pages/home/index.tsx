import ExampleWrapper from '@/components/app/ExampleWrapper';
import Component01 from '@/features/Home/components/Component01';
import Component02 from '@/features/Home/components/Component02';
import FilterFormComponent from '@/features/Home/components/FilterFormComponent';
import PresentationArea from '@/features/Home/components/PresentationArea';

const Home = () => {
	return (
		<ExampleWrapper>
			<div className="space-y-16">
				<Component01 />
				<Component02 />
				<PresentationArea />
				<FilterFormComponent />
			</div>
		</ExampleWrapper>
	);
};

export default Home;
