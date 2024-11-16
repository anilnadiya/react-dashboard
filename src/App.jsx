import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //
const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeCustomization>
      <QueryClientProvider client={queryClient}>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </QueryClientProvider>
    </ThemeCustomization>
  );
}
