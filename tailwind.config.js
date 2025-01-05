/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,ts,tsx,js,jsx}'],
	

	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				'primary-light': 'var(--primary-light)',
				'secondary-light': 'var(--secondary-light)',
				'danger-light': 'var(--danger-light)',
				'primary-hover': 'var(--primary-hover)',
				'primary-dark': 'var(--primary-dark)',
				'rgba-primary-1': 'var(--rgba-primary-1)',
				'rgba-primary-2': 'var(--rgba-primary-2)',
				'rgba-primary-3': 'var(--rgba-primary-3)',
				'rgba-primary-4': 'var(--rgba-primary-4)',
				'rgba-primary-5': 'var(--rgba-primary-5)',
				'rgba-primary-6': 'var(--rgba-primary-6)',
				'rgba-primary-7': 'var(--rgba-primary-7)',
				'rgba-primary-8': 'var(--rgba-primary-8)',
				'rgba-primary-9': 'var(--rgba-primary-9)',
				'rgba-secondary-1': 'var(--rgba-secondary-1)',
				'gradient-one': 'var(--gradient-one)',
				'tryal-gradient': 'var(--tryal-gradient)',
				title: 'var(--title)',
				'text-gray': 'var(--text-gray)',
				text: 'var(--text)',
				'body-bg': 'var(--body-bg)',
				border: 'var(--border)',
				card: 'var(--card)',
				'nav-headbg': 'var(--nav-headbg)',
				'sidebar-bg': 'var(--sidebar-bg)',
				headerbg: 'var(--headerbg)',
			},
			fontFamily: {
				'font-family-base': 'var(--font-family-base)',
			},
		},
	},
	plugins: [],
};
