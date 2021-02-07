import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

/**
 * React Query is an agnostic way of handling promises of any type, providing the most common
 * needed data:
 * - isLoading
 * - error
 * - data
 * It makes also easy to keep the data synchronized automatically after recovering the focus
 * on the window, recovering from a connecting lost or when handling mutations
 */

const AppQueriesProvider: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

export default AppQueriesProvider;
