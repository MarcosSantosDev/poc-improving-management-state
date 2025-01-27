import * as React from 'react';

import { Link } from 'react-router-dom';

import Component01 from '@/features/Home/components/Component01';
import Component02 from '@/features/Home/components/Component02';
import FilterFormComponent from '@/features/Home/components/FilterFormComponent';
import PresentationArea from '@/features/Home/components/PresentationArea';

const Home: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<h1 className="mb-6 text-3xl font-bold">Home</h1>
			<Link
				to="/components"
				className="text-lg font-medium text-blue-400"
			>
				Components
			</Link>
			<Link
				to="/forms"
				className="text-lg font-medium text-blue-400"
			>
				Forms
			</Link>

			<div className="space-y-16">
				<Component01 />
				<Component02 />
				<PresentationArea />
				<FilterFormComponent />
			</div>
		</div>
	);
};

export default Home;
