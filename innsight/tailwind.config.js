/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: ['index.html','src/**/*.{tsx,ts}'],
  theme: {
    screens:{
      'sm':'0px',
      'md':'768px',
      'lg':'1024px',
      'xl':'1650px',
    },
    extend: {
      fontFamily:{
        'roboto':['Roboto','sans-serif']
      },
      colors:{
        primary:{
          100:"#916afc",
          200:"#7b4cfc",
          300:"#6832fc",
          400:"#5a1fff",
          500:'#4400ff',
          600:"#3900d6",
          700:"#2f00b0",
          800:"#22017d",
          900:"#160152"
        },
        secondary:'#08081f',
        background:'#181824'
    },
    },
  },
  plugins: [],
}

