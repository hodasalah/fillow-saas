import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	base: '/',
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		rollupOptions: {
			output: {
				entryFileNames: 'assets/[name].js',
				chunkFileNames: 'assets/[name].js',
				assetFileNames: 'assets/[name].[ext]',
				manualChunks: {
					vendor: ['react', 'react-dom', 'react-router-dom'],
					firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
					charts: ['apexcharts', 'react-apexcharts'],
					framer: ['framer-motion'],
				},
			},
		},
		chunkSizeWarningLimit: 1000,

	},
});
