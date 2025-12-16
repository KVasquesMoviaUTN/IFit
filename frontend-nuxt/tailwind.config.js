/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./app.vue",
		"./error.vue",
	],
	theme: {
		extend: {
			colors: {
				primary: '#165B33', // Christmas Green
				accent: '#D42426', // Christmas Red
				secondary: '#d4af37', // Gold/Bronze
				background: '#f9f9f7', // Off-white/Cream
				text: '#2d2d2d', // Dark Charcoal
				'feta': {
					'50': '#f4fdec',
					'100': '#e1f9ce',
					'200': '#c5f3a3',
					'300': '#a0e96d',
					'400': '#7ddb40',
					'500': '#5ec121',
					'600': '#459a16',
					'700': '#377516',
					'800': '#2e5d17',
					'900': '#2a4f18',
					'950': '#122c07',
				},
				'apricot': {
					'50': '#fdfdec',
					'100': '#fbfbc6',
					'200': '#f7f491',
					'300': '#f2e852',
					'400': '#edd622',
					'500': '#ddbe15',
					'600': '#be9610',
					'700': '#986c10',
					'800': '#7e5715',
					'900': '#6b4718',
					'950': '#3e250a',
				},
			},
			fontFamily: {
				serif: ['"Playfair Display"', 'serif'],
				sans: ['"Poppins"', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
