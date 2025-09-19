/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'reformed-blue': '#1e40af',
                'reformed-gold': '#f59e0b',
                'reformed-gray': '#6b7280',
            },
            fontFamily: {
                'serif': ['Georgia', 'serif'],
                'sans': ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
