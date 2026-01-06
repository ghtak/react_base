import { createFileRoute } from '@tanstack/react-router'
import { SamplePage } from '@/features/sample/pages/sample-page'

export const Route = createFileRoute('/_main/sample')({
  component: SamplePage,
})

