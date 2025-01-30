import * as React from 'react';

import { Link } from 'react-router-dom';

const ExampleWrapper = ({ children }: React.PropsWithChildren) => {
	return (
		<div className="min-h-screen space-y-20 bg-gray-50 p-6">
			<div className="flex gap-10">
				<Link
					to="/"
					className="rounded-full border px-6 py-2 text-md font-medium text-blue-400"
				>
					Forms - Persistindo Dados
				</Link>
				<Link
					to="/forms"
					className="rounded-full border px-6 py-2 text-md font-medium text-blue-400"
				>
					Forms - Comportamento dos Componentes
				</Link>
				<Link
					to="/components"
					className="rounded-full border px-6 py-2 text-md font-medium text-blue-400"
				>
					Components
				</Link>
				<Link
					to="/filters"
					className="rounded-full border px-6 py-2 text-md font-medium text-blue-400"
				>
					Filters - URL State
				</Link>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default ExampleWrapper;
