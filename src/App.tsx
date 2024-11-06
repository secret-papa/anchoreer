import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RecruitPage from './pages/recruit';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecruitPage />
    </QueryClientProvider>
  );
}

export default App;
