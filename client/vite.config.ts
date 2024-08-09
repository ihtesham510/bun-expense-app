import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import tsconfigpaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigpaths(), TanStackRouterVite()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(import.meta.dir, './src'),
			'@server/*': path.resolve(import.meta.dir, '../server'),
		},
	},
})
