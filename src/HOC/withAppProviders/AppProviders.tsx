import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ptBR } from 'date-fns/locale/pt-BR';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { ErrorBoundary, Suspense } from '@/components/app';
import { queryClient } from '@/libs/react-query';

const AppProviders = ({ children }: React.PropsWithChildren) => {
	return (
		<ErrorBoundary>
			<Suspense>
				<LocalizationProvider
					dateAdapter={AdapterDateFns}
					adapterLocale={ptBR}
				>
					<HelmetProvider>
						<QueryClientProvider client={queryClient}>
							<ToastContainer />
							{children}
							<ReactQueryDevtools initialIsOpen={false} />
						</QueryClientProvider>
					</HelmetProvider>
				</LocalizationProvider>
			</Suspense>
		</ErrorBoundary>
	);
};

export default AppProviders;
