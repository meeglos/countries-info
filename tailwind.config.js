/** @type {import('tailwindcss').Config} */
export default {
    content: [
        /* comment in order to keep these array elements multiline */
        './index.html',
        './src/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                lora: "'Lora', serif",
                dm: "'DM Mono', monospace",
                slabo: "'Slabo 27px', serif;",
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
