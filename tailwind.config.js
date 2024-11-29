/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./pages/*.html" ,"./js/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Space Grotesk', 'sans-serif']
      }
    },
    backgroundPosition: {
      'center-right': 'right top 3px',
    }
  },
  plugins: [],
}

