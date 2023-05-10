/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                'blue': '#1fb6ff',
                'purple': '#7e5bef',
                'pink': '#ff49db',
                'orange': '#ff7849',
                'green': '#13ce66',
                'yellow': '#ffc82c',
                'gray-dark': '#273444',
                'gray': '#8492a6',
                'gray-light': '#d3dce6',
                'radiant-black': '#001437',
                'radiant-blue': '#7898FB',
                'radiant-green': '#5CE5D5',
                'radiant-yellow': '#BBF83C',
            },
            fontFamily: {
                sans: ['Graphik', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
            spacing: {
                '8xl': '96rem',
                '9xl': '128rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            fontSize: {
                'xs': ['0.5rem', {
                    lineHeight: 1.5,
                    letterSpacing: '-0.01em',
                    fontWeight: '100',
                }]
            }
        },
    },
    plugins: [],
}
