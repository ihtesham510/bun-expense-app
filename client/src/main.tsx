import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { routeTree } from './routeTree.gen.ts'
import { createRouter, RouterProvider } from '@tanstack/react-router'
const router = createRouter({ routeTree })
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

document.documentElement.classList.add('dark')
const client = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={client}>
			<RouterProvider router={router} />
			<ReactQueryDevtools position="bottom" initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>,
)
