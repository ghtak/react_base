import { createFileRoute } from '@tanstack/react-router'
import { MainPage } from '@/pages/mainpage'

export const Route = createFileRoute('/_main/')({
  component: MainPage,
})