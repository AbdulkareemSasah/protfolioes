/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				background: 'var(--color-background)',
				surface: 'var(--color-surface)',
				text: 'var(--color-text)',
				'text-muted': 'var(--color-text-muted)',
				accent: 'var(--color-accent)',
			},
			fontFamily: {
				body: ['var(--font-body)', 'sans-serif'],
				heading: ['var(--font-heading)', 'sans-serif'],
			},
			borderRadius: {
				sm: 'var(--radius-sm)',
				base: 'var(--radius-base)',
				lg: 'var(--radius-lg)',
				xl: 'var(--radius-xl)',
				full: 'var(--radius-full)',
			}
		},
	},
	plugins: [],
}
