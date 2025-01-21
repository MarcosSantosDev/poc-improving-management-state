import * as React from 'react';

import { RouteObject } from 'react-router-dom';

import { RouteErrorElement } from '@/components/app';

import routePaths from './routePaths';

const Home = React.lazy(() => import('@/pages/home'));

export const routes: RouteObject[] = [
	{
		errorElement: <RouteErrorElement />,
		id: 'ROOT',
		path: routePaths.ROOT,
		element: <Home />,
	},
];

export default routes;
