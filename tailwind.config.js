/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/flowbite/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      screens: {
        '375px': '375px',   
        '425px': '425px',   
        'smd': '860px',   
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

