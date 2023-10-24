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
      colors:{
        primary:{
          100:"#b185ff",
          200:"#9b62fc",
          300:"#843ffc",
          400:"#7424ff",
          500:'#5d00ff',
          600:"#5402e3",
          700:"#4000b0",
          800:"#2b0173",
          900:"#1b014a"
        },
        secondary:'#08081f',
        background:'#181824'
    },
    },
  },
  plugins: [],
}

