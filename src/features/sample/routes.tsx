import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from '@/routes/__root';
import { SamplePage } from './pages/sample-page';

export const sampleRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: 'sample',
  component: SamplePage,
});
