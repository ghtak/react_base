import { createFileRoute } from '@tanstack/react-router';
import { MainLayout } from '@components/layout/mainlayout';

export const Route = createFileRoute('/_main')({
  component: MainLayout,
});
