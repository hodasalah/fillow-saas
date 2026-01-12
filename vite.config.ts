import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						if (id.includes('firebase')) {
							return 'vendor-firebase';
						}
						if (id.includes('apexcharts')) {
							return 'vendor-charts';
						}
						if (id.includes('framer-motion')) {
							return 'vendor-animation';
						}
						if (id.includes('date-fns')) {
							return 'vendor-date-utils';
						}
						if (id.includes('@fortawesome') || id.includes('metismenu')) {
							return 'vendor-ui';
						}
						if (
							id.includes('react') ||
							id.includes('redux') ||
							id.includes('scheduler') ||
							id.includes('prop-types')
						) {
							return 'vendor-react-core';
						}
						return 'vendor'; // all other node_modules
					}
				},
			},
		},
	},
});
