import * as React from 'react';

import Component01 from '@/features/Home/components/Component01';
import Component02 from '@/features/Home/components/Component02';
import PresentationArea from '@/features/Home/components/PresentationArea';

const Home: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<h1 className="mb-6 text-3xl font-bold">Início</h1>

			<div>
				<Component01 />
				<Component02 />
				<PresentationArea />
			</div>
		</div>
	);
};

export default Home;
