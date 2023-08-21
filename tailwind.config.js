/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#262626', // пример значения для основного цвета в теме Dark
          secondary: '#bfbfbf', // пример значения для второстепенного цвета в теме Dark
          text: '#696666', // пример значения для второстепенного цвета в теме Dark
          // добавьте другие цвета, необходимые для вашей темы Dark
        },
        light:{
          primary: "white"
        },
        danger:{
          primary:"red"
        }
      },
    },
  },
  plugins: [],
}

