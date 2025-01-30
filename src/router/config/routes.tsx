import * as React from 'react';

import { RouteObject } from 'react-router-dom';

import { RouteErrorElement } from '@/components/app';

import routePaths from './routePaths';

const Home = React.lazy(() => import('@/pages/home'));
const Components = React.lazy(() => import('@/pages/components'));
const Forms = React.lazy(() => import('@/pages/forms'));
const Filters = React.lazy(() => import('@/pages/filters'));

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
			{
				id: 'FORMS',
				path: routePaths.FORMS,
				element: <Forms />,
			},
			{
				id: 'FILTERS',
				path: routePaths.FILTERS,
				element: <Filters />,
			},
		],
	},
];

export default routes;
