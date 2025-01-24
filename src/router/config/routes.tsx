import * as React from 'react';

import { RouteObject } from 'react-router-dom';

import { RouteErrorElement } from '@/components/app';

import routePaths from './routePaths';

const Home = React.lazy(() => import('@/pages/home'));
const Components = React.lazy(() => import('@/pages/components'));

export const routes: RouteObject[] = [
	{
		errorElement: <RouteErrorElement />,
		id: 'ROOT',
		path: routePaths.ROOT,
		children: [
			{
				id: 'HOME',
				path: routePaths.ROOT,
				element: <Home />,
			},
			{
				id: 'COMPONENTS',
				path: routePaths.COMPONENTS,
				element: <Components />,
			},
		],
	},
];

export default routes;
